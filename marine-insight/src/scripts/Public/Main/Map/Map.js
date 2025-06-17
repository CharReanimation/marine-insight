import React, { useState, useEffect } from "react"; // React
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";

// Components
import { LoadGeoData } from "../GeoData/GeoData";
import ZoomDisplay from "./Components/ZoomDisplay";

// Header & Footer
import Header from "../../../Components/Header/Header";

// Built-in Style
import "leaflet/dist/leaflet.css";

// CSS
import "./css/Map.css";
import "../../Basic/css/Basic.css";

// Fix icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Change View
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

// Force Map Resize
const ForceMapResize = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // Delay
  }, []);
  return null;
};

// Map Click Lat, Lng
const ClickHandler = ({ onClick }) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e) => {
      onClick(e.latlng);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onClick]);

  return null;
};

// Color function for clusters
const getClusterColor = (clusterId) => {
  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];
  return colors[clusterId % colors.length];
};

// Map
const Map = () => {
  // Position
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");
  const [position, setPosition] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [mapCentered, setMapCentered] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [geoData, setGeoData] = useState(null); // GeoJSON Data
  const [ready, setReady] = useState(false);

  // Load GeoJSON
  useEffect(() => {
    const fetchGeoData = async () => {
      setReady(false);
      setGeoData(null);

      const data = await LoadGeoData(selectedFile); // Load Geo Data

      if (data) {
        setGeoData(data);

        const defaultCoords = {
          "/data/GEO/obvymk_quality_clusters.geojson": [45.16833, -72.69351],
          "/data/GEO/placentia_chemistry_clusters.geojson": [47.88671, -53.95253],
          "/data/GEO/predicted_clusters.geojson": [45.24481, -66.05948],
        };

        const coord = defaultCoords[selectedFile];
        if (coord) {
          setLatInput(coord[0].toString());
          setLngInput(coord[1].toString());
          setPosition(coord);
          setMapCentered(false);
          setReady(true);
        }
      }
    };

    if (selectedFile) {
      fetchGeoData();
    }
  }, [selectedFile]);

  // Handle Update
  const handleUpdate = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setPosition([lat, lng]);
      setMapCentered(true);
    } else {
      alert(
        "Please Input Valid Coordinates (Longitutde -180~180, Latitude -90~90)"
      );
    }
  };

  // Handle GeoJSON Selection
  const handleGeoJsonSelection = (filePath) => {
    setSelectedFile(filePath);
  };

  // Clear Markers
  const handleClearMarkers = () => {
    setPosition(null);
    setClickPosition(null);
    setLatInput("");
    setLngInput("");
  };

  // Return
  return (
    <div id="Map-body">
      <Header HeaderText="MAP" />

      {/* GeoJSON File Selector */}
      <div className="geojson-selector">
        <label>
          <input
            type="radio"
            name="geojson"
            value="/data/GEO/obvymk_quality_clusters.geojson"
            checked={
              selectedFile === "/data/GEO/obvymk_quality_clusters.geojson"
            }
            onChange={(e) => handleGeoJsonSelection(e.target.value)}
          />
          Cluster 1
        </label>
        <label>
          <input
            type="radio"
            name="geojson"
            value="/data/GEO/placentia_chemistry_clusters.geojson"
            checked={
              selectedFile === "/data/GEO/placentia_chemistry_clusters.geojson"
            }
            onChange={(e) => handleGeoJsonSelection(e.target.value)}
          />
          Cluster 2
        </label>
        <label>
          <input
            type="radio"
            name="geojson"
            value="/data/GEO/predicted_clusters.geojson"
            checked={selectedFile === "/data/GEO/predicted_clusters.geojson"}
            onChange={(e) => handleGeoJsonSelection(e.target.value)}
          />
          Cluster 3
        </label>
      </div>

      {/* User Input */}
      <div className="input-container">
        <div className="input-panel">
          {/* LAT */}
          <div className="input-block">
            <label htmlFor="lat">LAT:</label>
            <input
              id="lat"
              type="text"
              placeholder="Latitude"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
            />
          </div>
          {/* LNG */}
          <div className="input-block">
            <label htmlFor="lng">LNG:</label>
            <input
              id="lng"
              type="text"
              placeholder="Longitude"
              value={lngInput}
              onChange={(e) => setLngInput(e.target.value)}
            />
          </div>
        </div>
        <p>Try Example: Lat = 45.24481, Lng = -66.05948</p>
        <button className="btn-main-short" onClick={handleUpdate}>
          UPDATE MAP
        </button>
        <button className="btn-main-short" onClick={handleClearMarkers}>
          CLEAR MARKER
        </button>
      </div>

      {/* Map */}
      {ready && (
        <div id="map-container">
          <div className="map-wrapper">
            <MapContainer
              key={selectedFile}
              center={position}
              zoom={11}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <ForceMapResize />

              {/* Change View */}
              {!mapCentered && <ChangeView center={position} />}

              {/* Click Handler */}
              <ClickHandler
                onClick={(latlng) => {
                  setClickPosition(latlng);
                  setMapCentered(true);
                }}
              />

              {/* Tile Layer */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Zoom Display */}
              <ZoomDisplay />

              {/* Marker From Update Map */}
              {position && (
                <Marker position={position}>
                  <Popup>
                    Coordinate: {position[0].toFixed(5)},{" "}
                    {position[1].toFixed(5)}
                  </Popup>
                </Marker>
              )}

              {/* User Click Marker */}
              {clickPosition && (
                <Marker position={clickPosition}>
                  <Popup>
                    Coordinate: {clickPosition.lat.toFixed(5)},{" "}
                    {clickPosition.lng.toFixed(5)}
                  </Popup>
                </Marker>
              )}

              {/* GeoJSON cluster points */}
              {geoData && (
                <GeoJSON
                  data={geoData}
                  pointToLayer={(feature, latlng) => {
                    return L.circleMarker(latlng, {
                      radius: 6,
                      fillColor: getClusterColor(feature.properties.cluster),
                      fillOpacity: 0.1,
                      color: "#000",
                      opacity: 0.2,
                      weight: 1,
                    }).bindPopup(`Cluster: ${feature.properties.cluster}`);
                  }}
                />
              )}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// Export
export default Map;
