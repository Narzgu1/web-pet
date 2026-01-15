import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

export default function MapView({ facilities, selectedFacility }) {
  const defaultCenter = [40.7580, -73.9855];

  // Filter out facilities without valid coordinates
  const validFacilities = facilities.filter(
    facility => facility?.lat && facility?.lng
  );

  return (
    <div className="h-[500px] md:h-full w-full rounded-lg overflow-hidden shadow-inner border border-gray-200">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {validFacilities.map(facility => (
          <Marker 
            key={facility.id} 
            position={[facility.lat, facility.lng]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-blue-600">{facility.name}</h3>
                <p className="text-xs text-gray-600">{facility.type}</p>
                <p className="text-sm mt-1">{facility.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedFacility?.lat && selectedFacility?.lng && (
          <ChangeView center={[selectedFacility.lat, selectedFacility.lng]} />
        )}
      </MapContainer>
    </div>
  );
}