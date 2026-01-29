// MapboxGlobe.jsx
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapboxGlobe() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 1) Set your token
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamV0Y3hkZXIiLCJhIjoiY21rcHU1bGNsMGh1ZTNwcXl3em1oN3B4bCJ9.pZOcgHrBXLH2GUxSrXciXg";

    // 2) Init map in globe mode
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      projection: "globe",
      center: [0, 20],
      zoom: 1.5,
      pitch: 0,
      bearing: 0,
      antialias: true,
    });

    // 3) Add controls
    map.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right",
    );

    // 4) Atmosphere + fog for globe
    map.on("style.load", () => {
      map.setFog({
        range: [0.8, 8],
        color: "rgba(200, 200, 230, 0.2)",
        "horizon-blend": 0.02,
        "high-color": "rgba(36, 92, 223, 0.2)",
        "space-color": "rgba(11, 11, 25, 1.0)",
        "star-intensity": 0.15,
      });
    });

    // 5) Add country boundaries (Mapbox vector tileset)
    map.on("load", () => {
      // Source: Mapbox's country boundaries tileset
      map.addSource("country-boundaries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      // Fill layer (semi-transparent)
      map.addLayer({
        id: "country-fill",
        type: "fill",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "rgba(0, 255, 0, 0.25)",
          "fill-outline-color": "#00ff66",
        },
      });

      // Stroke layer (clear green borders)
      map.addLayer({
        id: "country-stroke",
        type: "line",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        paint: {
          "line-color": "#00ff66",
          "line-width": 1.2,
        },
      });

      // Hover highlight (optional)
      let hoveredId = null;
      map.addLayer({
        id: "country-hover",
        type: "fill",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "rgba(0, 255, 0, 0.45)",
        },
        filter: ["==", ["get", "mapbox_id"], ""], // empty filter initially
      });

      map.on("mousemove", "country-fill", (e) => {
        const f = e.features && e.features[0];
        if (!f) return;
        const id = f.properties.mapbox_id;
        if (id !== hoveredId) {
          hoveredId = id;
          map.setFilter("country-hover", ["==", ["get", "mapbox_id"], id]);
          map.getCanvas().style.cursor = "pointer";
        }
      });

      map.on("mouseleave", "country-fill", () => {
        hoveredId = null;
        map.setFilter("country-hover", ["==", ["get", "mapbox_id"], ""]);
        map.getCanvas().style.cursor = "";
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
    />
  );
}

export default MapboxGlobe;
