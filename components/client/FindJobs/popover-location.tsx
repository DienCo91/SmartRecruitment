'use client';

import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CountryRegion, Region } from '@/components/ui/helpers';
import CountrySelect from '@/components/ui/country-select';
import RegionSelect from '@/components/ui/region-select';

export interface PopoverLocationRef {
  getValue: () => { country?: CountryRegion; region?: Region };
}

const PopoverLocation = forwardRef<PopoverLocationRef>((props, ref) => {
  const [countryCode, setCountryCode] = useState<CountryRegion>();
  const [locationText, setLocationText] = useState<Region>();

  const onChangeCountry = (value: CountryRegion) => {
    setCountryCode(value);
    setLocationText(undefined);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => ({
      country: countryCode,
      region: locationText,
    }),
  }));

  return (
    <Popover>
      <PopoverTrigger asChild className="w-[140px]">
        <Button
          variant="ghost"
          className="flex items-center px-4 text-gray-500 hover:text-blue-primary rounded-none flex-1 h-[56px]"
        >
          <MapPin className="mr-2 text-blue-primary" size={18} />
          <span className="text-[14px]">{locationText?.name ?? 'Location'}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="flex w-full">
          <CountrySelect
            className="w-full mr-[16px]"
            onChange={onChangeCountry}
            placeholder={countryCode?.countryName ?? 'Select country'}
            priorityOptions={['US']}
          />
          <RegionSelect
            countryCode={countryCode?.countryShortCode || ''}
            onChange={value => setLocationText(value)}
            className="w-full"
            placeholder={locationText?.name}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});

PopoverLocation.displayName = 'PopoverLocation';

export default PopoverLocation;
