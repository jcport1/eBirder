export default function MapSelectedSighting(props) {
  const { selectedSighting, handleSightingUpdate, handleSightingDelete } =
    props;

  return (
    <div className="popup">
      <p>
        <span className="popup-field">Name:</span> {selectedSighting.comName}
      </p>
      <p>
        <span className="popup-field">Observed:</span> {selectedSighting.obsDt}
      </p>
      {selectedSighting.author && (
        <>
          <p>
            <span className="popup-field">Comment:</span>{" "}
            {selectedSighting.comment}
          </p>
          <div className="sighting-popup-btns">
            <button
              onClick={() => handleSightingUpdate(selectedSighting)}
              className="popup-btn"
            >
              Edit
            </button>
            <button
              onClick={() => handleSightingDelete(selectedSighting._id)}
              className="popup-btn danger-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
