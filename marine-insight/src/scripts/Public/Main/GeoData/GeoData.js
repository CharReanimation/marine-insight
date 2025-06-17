// Load Geo Data
export const LoadGeoData = async (path) => {
  // Path
  console.log("Loading GeoJSON:", path);
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("GeoJSON loaded:", data);
    return data;
  } catch (error) {
    console.error("Failed to load GeoJSON:", error);
    return null;
  }
};
