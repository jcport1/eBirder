import { MyLocation } from "@mui/icons-material";

export default function MapHeader(props) {
  const { handleNearbyMarkers, handleHotSpotMarkers, handleMyLocation } = props;

  return (
    <div className="map-header">
      <button className="nearby-btn" onClick={handleNearbyMarkers}>
        Nearby Sightings
      </button>{" "}
      <button className="nearby-btn" onClick={handleHotSpotMarkers}>
        Nearby Hotspots
      </button>{" "}
      <MyLocation className="my-location-icon" onClick={handleMyLocation} />
    </div>
  );
}
