export default function MapSelectedHotspot({ selectedHotspot }) {
  return (
    <div className="popup">
      <p>
        <span className="popup-field">Location:</span> {selectedHotspot.locName}
      </p>
      <p>
        <span className="popup-field">Latest Observation:</span>{" "}
        {selectedHotspot.latestObsDt}
      </p>
      <p>
        <span className="popup-field">All Time No. of Species Observed</span>{" "}
        {selectedHotspot.numSpeciesAllTime}
      </p>
    </div>
  );
}
