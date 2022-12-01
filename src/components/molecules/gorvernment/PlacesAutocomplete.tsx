import * as React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng, LatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput } from '@reach/combobox';
import { Button } from '@mui/material';

const PlacesAutocomplete = ({ map, setSelected }: { map: google.maps.Map | null, setSelected: React.Dispatch<React.SetStateAction<LatLng[] | null>>}) => {
  const [address, setAddress] = React.useState<string>('');
  const { ready } = usePlacesAutocomplete({
    requestOptions: {
      types: ['postal_code'],
      componentRestrictions: { country: 'jp' }
    }
  });
  // Storageのキャッシュに検索履歴が残っている為、requestOptionsがうまく働かない為、キャッシュを削除。
  sessionStorage.removeItem('upa');

  const handleClick = async () => {
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    map?.panTo({ lat, lng });

    const googleMap = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(googleMap);
    // keyword で該当の市を絞り込む
    let keyword = ''
    for (let i=0; results[0].address_components.length > i; i++) {
      if (results[0].address_components[i].long_name.match('市')) {
        keyword = results[0].address_components[i].long_name;
        break;
      }
    }
    
    const markerPoint = (results: any) => {
      const array: any = [];
      results.map((data: any) => {
        array.push(data.geometry.location)
      });
      setSelected(array);
    };

    service.nearbySearch({
      location: results[0].geometry.location,
      radius: 3000,
      type: 'city_hall',
      keyword: keyword,
    }, markerPoint)
  }

  return (
    <Combobox>
      <ComboboxInput value={address} onChange={(e) => setAddress(e.target.value)} disabled={!ready} placeholder='〒' style={{ padding: '8px' }} />
      <Button variant='contained' sx={{ ml: 3 }} onClick={handleClick}>
        検索
      </Button>
    </Combobox>
  )
}

export default PlacesAutocomplete;