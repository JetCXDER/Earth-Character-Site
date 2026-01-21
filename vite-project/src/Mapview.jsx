import { MapContainer, TileLayer } from "react-leaflet";

function MapView() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    </div>
  );
}

export default MapView;
