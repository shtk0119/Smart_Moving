import * as React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng, LatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';

const PlacesAutocomplete = ({ map, setSelected }: { map: google.maps.Map | null, setSelected: React.Dispatch<React.SetStateAction<LatLng | null>>}) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['city_hall'],
      componentRestrictions: { country: 'jp' }
    }
  });
  // Storageのキャッシュに検索履歴が残っている為、requestOptionsがうまく働いていない。
  sessionStorage.removeItem('upa');

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });
    map?.panTo({ lat, lng });
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} style={{ padding: '8px' }} />
      <ComboboxPopover>
        <ComboboxList style={{ listStyle: 'none', width: '300px' }}>
          {status === 'OK' && data.map(({ place_id, description }) => (
            <ComboboxOption 
              key={place_id}
              value={description}
              className='option_list'
            />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default PlacesAutocomplete;