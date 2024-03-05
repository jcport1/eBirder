import React from "react";

export default function Parameters(props) {
  const { handleSearchSubmit, setSearchLng, setSearchLat } = props;

  return (
    //drop a pin to grab lat and lng?
    <div className="search-form-container">
      <h2>Search Observations</h2>
      <form onSubmit={handleSearchSubmit} className="search-form">
        {/* basic validation for required fields */}
        <label className="form-field">Longitude</label>
        <input
          type="text"
          required
          onChange={(e) => setSearchLng(parseFloat(e.target.value))}
        />
        <label className="form-field">Latitude</label>
        <input
          type="text"
          required
          onChange={(e) => setSearchLat(parseFloat(e.target.value))}
        />
        <button className="form-btn">Submit</button>
      </form>
    </div>
  );
}
