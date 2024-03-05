export default function MapNewSighting(props) {
  const { handleFormSubmit, bird, setBird } = props;
  return (
    <>
      <h2 className="add-form-title">Add Sighting</h2>
      <form onSubmit={handleFormSubmit} className="popup-form add-form">
        <label className="popup-field">
          {" "}
          Bird:{" "}
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setBird({
                ...bird,
                ...{ comName: e.target.value },
              })
            }
            className="popup-input popup-field-size"
          />
        </label>
        <label className="popup-field">
          Comment:
          <input
            type="text"
            name="comment"
            onChange={(e) =>
              setBird({
                ...bird,
                ...{ comment: e.target.value },
              })
            }
            className="popup-input popup-field-size"
          />
        </label>
        <input type="submit" value="Submit" className="popup-btn add-btn" />
      </form>
    </>
  );
}
