import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const Location = ({ ship }: any) => {
  
  // console.log(ship);

  const { t } = useTranslation();
  const latitude = ship.latitude;
  const longitude = ship.longitude;

  return (
    <div>
      <p className="font-semibold text-writingMainDark text-[18px] lg:text-[20px]">
        {t("approximate_location")}
      </p>

      <div className="map mt-3 lg:mt-5 rounded-10 overflow-hidden">
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {t("approximate_location")}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Location;