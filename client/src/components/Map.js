import React, { useContext, useState, useEffect } from "react";
import Parameters from "./Parameters";
import SpeciesContainer from "./SpeciesContainer";
import MapHeader from "./MapHeader";
import MapSelectedSighting from "./MapSelectedSighting";
import MapEditSighting from "./MapEditSighting";
import MapNewSighting from "./MapNewSighting";
import MapSelectedHotspot from "./MapSelectedHotspot";
import MapBox, { Marker, Popup } from "react-map-gl";
import { Twitter, LocationOn } from "@mui/icons-material";
import "mapbox-gl/dist/mapbox-gl.css";
import UserContext from "../contexts/UserContext";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const [initialCoords, setInitialCoords] = useState({
    initialLat: 43.66,
    initialLng: -70.24,
  });

  const [myMap, setMapState] = useState({
    latitude: 43.66,
    longitude: -70.24,
    zoom: 12,
  });

  // THIS HAS GLOBAL USER INFO
  const { state } = useContext(UserContext);

  const [lat, setLat] = useState(43.66);
  const [lng, setLong] = useState(-70.24);
  const [zoom, setZoom] = useState(12);
  const [showSpecies, setShowSpecies] = useState(false);

  //user markers
  const [userMarkers, setUserMarkers] = useState(null);

  //nearby markers
  const [nearbyMarkers, setNearbyMarkers] = useState([]);

  //hotspot markers
  const [hotspotMarkers, setHotspotMarkers] = useState([]);

  //pop ups
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  //add new sighting pop
  const [newSightingForm, setNewSightingForm] = useState(false);

  //bird temp state used for creating new bird sighting
  //and updating exisiting bird sighting
  const [bird, setBird] = useState(null);

  //edit sighting
  const [editSighting, setEditSighting] = useState(null);

  //useEffect: load local sightings
  useEffect(() => {
    if (!state.isAuthenticated) return;
    fetch(`/birds/find/${state.user.email}`)
      .then((res) => res.json())
      .then((data) => setUserMarkers(data));
  }, [userMarkers]);

  function handleNearbyMarkers() {
    fetch(`/birds/nearby/${lat}/${lng}`)
      .then((res) => res.json())
      .then((data) => setNearbyMarkers(data));
  }

  function handleHotSpotMarkers() {
    console.log("i was clicked");
    fetch(`/birds/hotspots/${lat}/${lng}`)
      .then((res) => res.json())
      .then((data) => setHotspotMarkers(data));
  }

  //handle click for event listener on map
  function handleMapClick(e) {
    if (!state.isAuthenticated) return;
    if (!selectedSighting && !selectedHotspot) {
      setLong(e.lngLat.lng);
      setLat(e.lngLat.lat);
      setNewSightingForm(true);
    }
  }

  //post form data to backend (new sighting)
  function handleFormSubmit(e) {
    e.preventDefault();
    setNewSightingForm(false);

    const data = {
      comName: bird.comName,
      lat: lat,
      lng: lng,
      comment: bird.comment,
      author: state.user.email,
    };

    fetch("/birds/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        setUserMarkers([...userMarkers], data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    fetch(`/birds/nearby/${lat}/${lng}`)
      .then((res) => res.json())
      .then((data) => {
        setMapState({ longitude: lng, latitude: lat, zoom: 10 });
        setNearbyMarkers(data);
      })
      .catch((error) => console.log(error));
  }

  function handleSightingChange(sightingChange) {
    setEditSighting(sightingChange);
  }

  function handleUpdateSubmit(e) {
    e.preventDefault();

    setEditSighting(null);

    const data = {
      comName: editSighting.comName,
      comment: editSighting.comment,
    };
    fetch(`birds/update/${editSighting._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setUserMarkers([...userMarkers], data))
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSightingUpdate(update_sighting) {
    setSelectedSighting(null);
    setEditSighting(update_sighting);
  }

  function handleSightingDelete(delete_id) {
    fetch(`/birds/delete/${delete_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    setSelectedSighting(null);
  }

  function handleMyLocation() {
    setMapState({
      longitude: initialCoords.initialLng,
      latitude: initialCoords.initialLat,
      zoom: 12,
    });
  }

  return (
    <>
      <div className="marker-btn">
        <MapHeader
          handleNearbyMarkers={handleNearbyMarkers}
          handleHotSpotMarkers={handleHotSpotMarkers}
          handleMyLocation={handleMyLocation}
        />
      </div>
      <div className="container">
        <div className="left">
          {/* Search Form */}
          <Parameters
            handleSearchSubmit={handleSearchSubmit}
            setSearchLng={setLong}
            setSearchLat={setLat}
          />
        </div>
        <div className="map-dashboard-container center">
          {/* remove? */}
          <div className="sidebar">
            Longitude: {lng.toFixed(2)} | Latitude: {lat.toFixed(2)} | Zoom:{" "}
            {zoom.toFixed(2)}
          </div>
          <div className="map-container">
            <MapBox
              id="mymap"
              {...myMap}
              style={{ width: "50vw", height: "50vh" }}
              onMove={(e) => {
                setMapState(e.viewState);
                setLat(e.viewState.latitude);
                setLong(e.viewState.longitude);
                setZoom(e.viewState.zoom);
              }}
              onClick={(e) => handleMapClick(e)}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              {" "}
              {/* user markers */}
              {userMarkers &&
                userMarkers.map((sighting, index) => (
                  <Marker
                    key={index}
                    longitude={sighting.lng}
                    latitude={sighting.lat}
                  >
                    <Twitter
                      className="bird-icon user-icon"
                      onClick={() => setSelectedSighting(sighting)}
                    />
                  </Marker>
                ))}
              {/* hotspot markers */}
              {hotspotMarkers &&
                hotspotMarkers.map((hotspot, index) => (
                  <Marker
                    key={index}
                    longitude={hotspot.lng}
                    latitude={hotspot.lat}
                  >
                    <LocationOn
                      className="hot-spot-icon"
                      onClick={() => setSelectedHotspot(hotspot)}
                    />
                  </Marker>
                ))}
              {/* Markers for nearby sightings */}
              {nearbyMarkers &&
                nearbyMarkers.map((sighting, index) => (
                  <Marker
                    key={index}
                    longitude={sighting.lng}
                    latitude={sighting.lat}
                  >
                    <Twitter
                      className="bird-icon"
                      onClick={() => setSelectedSighting(sighting)}
                    />
                  </Marker>
                ))}
              {/* Popups */}
              {selectedSighting && (
                <Popup
                  longitude={selectedSighting.lng}
                  latitude={selectedSighting.lat}
                  anchor="bottom-left"
                  onClose={() => setSelectedSighting(null)}
                  closeOnClick={false}
                  className="popup-container"
                >
                  <MapSelectedSighting
                    selectedSighting={selectedSighting}
                    handleSightingUpdate={handleSightingUpdate}
                    handleSightingDelete={handleSightingDelete}
                  />
                </Popup>
              )}
              {selectedHotspot && (
                <Popup
                  longitude={selectedHotspot.lng}
                  latitude={selectedHotspot.lat}
                  anchor="bottom-left"
                  onClose={() => setSelectedHotspot(null)}
                  closeOnClick={false}
                  className="popup-container"
                >
                  <MapSelectedHotspot selectedHotspot={selectedHotspot} />
                </Popup>
              )}
              {/* edit sighting */}
              {editSighting && (
                <Popup
                  longitude={editSighting.lng}
                  latitude={editSighting.lat}
                  anchor="bottom-left"
                  onClose={() => setEditSighting(null)}
                  closeOnClick={false}
                  className="popup-container"
                >
                  <MapEditSighting
                    editSighting={editSighting}
                    handleSightingChange={handleSightingChange}
                    handleUpdateSubmit={handleUpdateSubmit}
                  />
                </Popup>
              )}
              {/* add new sighting form */}
              {newSightingForm && (
                <Popup
                  longitude={lng}
                  latitude={lat}
                  onClose={() => setNewSightingForm(false)}
                  closeOnClick={false}
                  className="popup-container"
                >
                  <MapNewSighting
                    handleFormSubmit={handleFormSubmit}
                    bird={bird}
                    setBird={setBird}
                  />
                </Popup>
              )}
            </MapBox>
          </div>
        </div>
        <div className="right">
          <SpeciesContainer
            lat={myMap.latitude}
            lng={myMap.longitude}
            mapState={myMap}
            frequency="most"
            margin="0%"
          />
          <SpeciesContainer
            lat={myMap.latitude}
            lng={myMap.longitude}
            mapState={myMap}
            frequency="least"
            margin="5%"
          />
        </div>
      </div>
    </>
  );
}
