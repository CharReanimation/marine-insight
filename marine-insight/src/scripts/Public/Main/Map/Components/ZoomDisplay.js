import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

// CSS
import "./css/ZoomDisplay.css";


// ZoomDisplay
const ZoomDisplay = () => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const handleZoom = () => {
      setZoom(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  return (
    <div className="zoom-display">
      Zoom: {zoom}
    </div>
  );
};

// Export
export default ZoomDisplay;
