import * as React from 'react';
import { Box } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { LatLng } from 'use-places-autocomplete';
import PlacesAutocomplete from '../../molecules/gorvernment/PlacesAutocomplete';

const GovernmentMain = () => {
  const center = React.useMemo(() => ({ lat: 35.681382, lng: 139.766084 }), []);
  const [selected, setSelected] = React.useState<LatLng[] | null>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  return (
    <>
      <Box component='main' m='64px auto 32px'>
        <Box mt={5} width='1024px'>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} libraries={['places']}>
            <Box display='flex' justifyContent='center'>
              <PlacesAutocomplete map={map} setSelected={setSelected} />
            </Box>
            <GoogleMap
              zoom={13}
              center={center}
              mapContainerStyle={mapContainer}
              options={{
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {selected && 
                selected.map((data, index) => {
                  return <Marker key={index} position={data} />
                })
              }
            </GoogleMap>
          </LoadScript>
        </Box>
      </Box>
    </>
  );
};

export default GovernmentMain;

const mapContainer = {
  width: '100%',
  height: '600px',
  marginTop: '32px'
}