export default function MapEditSighting(props) {
  const { editSighting, handleSightingChange, handleUpdateSubmit } = props;

  return (
    <form className="popup-form" onSubmit={(e) => handleUpdateSubmit(e)}>
      <label>
        <span className="popup-field">Name:</span>{" "}
      </label>
      <input
        type="text"
        value={editSighting.comName}
        onChange={(e) =>
          //pass in the original object as first parameter and changed to field in second parameter
          handleSightingChange({
            ...editSighting,
            ...{ comName: e.target.value },
          })
        }
      />
      <label>
        <span className="popup-field">Comment:</span>{" "}
      </label>
      <input
        type="text"
        value={editSighting.comment}
        onChange={(e) =>
          //pass in the original object as first parameter and changed to field in second parameter
          handleSightingChange({
            ...editSighting,
            ...{ comment: e.target.value },
          })
        }
      />
      {/* <label>
       <span className="popup-field">Observed:</span>{" "}
     </label>
     <input type="text" value={editSighting.obsDt} /> */}
      <input type="submit" value="submit" className="popup-btn" />
    </form>
  );
}
