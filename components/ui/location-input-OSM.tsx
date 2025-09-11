'use client';

import { useEffect, useState, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OSMPlaceResult, OSMPlaceResults, OSMAddress } from '@/types';
import { IoLocation } from 'react-icons/io5';
import { Loader } from 'lucide-react';

type LocationInputOSMProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: {
    address: string;
    display_name: string;
    lat: number;
    lng: number;
    osm_id: number;
    address_detail: OSMAddress;
  }) => void;
  error?: string;
  placeholder?: string;
};

export default function LocationInputOSM({
  value,
  onChange,
  onSelect,
  error,
  placeholder = 'Enter a location...',
}: LocationInputOSMProps) {
  const [debouncedValue] = useDebounce(value, 300);
  const [suggestions, setSuggestions] = useState<OSMPlaceResults>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            debouncedValue
          )}&addressdetails=1&limit=5`
        );

        await new Promise(resolve => setTimeout(resolve, 200));

        const data: OSMPlaceResult[] = await response.json();
        setSuggestions(data);
        if (data.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching OSM data:', error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  const handleSelect = (item: OSMPlaceResult) => {
    const { display_name, lat, lon: lng, osm_id, address } = item;
    onChange(display_name);
    setIsOpen(false);

    onSelect({
      address: display_name,
      display_name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      osm_id,
      address_detail: address,
    });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );

          const data: OSMPlaceResult = await response.json();

          if (data.display_name) {
            const { display_name, lat, lon: lng, osm_id, address } = data;

            onChange(display_name);
            setIsOpen(false);

            onSelect({
              address: display_name,
              display_name,
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              osm_id,
              address_detail: address,
            });
          } else {
            alert('Could not find address for your location.');
          }
        } catch (error) {
          console.error('Reverse geocode error:', error);
          alert('Failed to get address from your location.');
        } finally {
          setIsGeolocating(false);
        }
      },
      error => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location. Please enable GPS.');
        setIsGeolocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex">
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={cn('w-full rounded-r-none')}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleUseCurrentLocation}
          disabled={isGeolocating}
          className="rounded-l-none border-l-0"
          aria-label="Use current location"
        >
          {isGeolocating ? (
            <span className="animate-spin">
              <Loader />
            </span>
          ) : (
            <IoLocation className="text-primary" />
          )}
        </Button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map(item => (
            <div
              key={item.osm_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelect(item)}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
