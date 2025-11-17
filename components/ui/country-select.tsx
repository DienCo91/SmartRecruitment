import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filterCountries } from './helpers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import countryRegionData from 'country-region-data/dist/data-umd';
import { useEffect, useState } from 'react';

export interface Region {
  name: string;
  shortCode: string;
}

export interface CountryRegion {
  countryName: string;
  countryShortCode: string;
  regions: Region[];
}

interface CountrySelectProps {
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: CountryRegion) => void;
  className?: string;
  placeholder?: string;
  value?: string;
}

function CountrySelect({
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = 'Country',
  value = '',
}: CountrySelectProps) {
  const [countries, setCountries] = useState<CountryRegion[]>([]);

  useEffect(() => {
    setCountries(filterCountries(countryRegionData, priorityOptions, whitelist, blacklist));
  }, []);

  const valueInit = countries.find(
    (country: CountryRegion) => country.countryName.toLowerCase() === value.toLowerCase()
  );

  if (!countries.length) return null;

  return (
    <Select
      onValueChange={(value: string) => {
        const data = countryRegionData.find(
          (country: CountryRegion) => country.countryShortCode === value
        );
        onChange(data);
      }}
      defaultValue={valueInit?.countryShortCode}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countries.map(({ countryName, countryShortCode }) => (
          <SelectItem key={countryName} value={countryShortCode}>
            {countryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountrySelect;
