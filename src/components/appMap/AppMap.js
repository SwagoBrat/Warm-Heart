import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "./appMap.scss";

const icon = new L.DivIcon({
    className: "w-marker",
    html: "<div>W</div>",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

export default function AppMap() {
    return (
        <div className="map-wrapper">
            <MapContainer
                center={[52.48, -1.88]}
                zoom={13}
                className="map"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[52.49, -1.89]} icon={icon} />
                <Marker position={[52.485, -1.87]} icon={icon} />
            </MapContainer>

            <div className="map-overlay" />
        </div>
    );
}
