// MapboxGlobe.jsx
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapboxGlobe({ setActiveNews }) {
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamV0Y3hkZXIiLCJhIjoiY21rcHU1bGNsMGh1ZTNwcXl3em1oN3B4bCJ9.pZOcgHrBXLH2GUxSrXciXg";

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

    map.on("load", () => {
      map.addSource("country-boundaries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

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

      let hoveredId = null;
      map.addLayer({
        id: "country-hover",
        type: "fill",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "rgba(0, 255, 0, 0.45)",
        },
        filter: ["==", ["get", "mapbox_id"], ""],
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

      // === News dots source ===
      map.addSource("news-dots", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [77.2090, 28.6139] }, // Delhi
              properties: { title: "Sample Headline", category: "breaking" }
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-74.006, 40.7128] }, // New York
              properties: { title: "Another Headline", category: "recent" }
            }
          ]
        }
      });

      map.addLayer({
        id: "news-dots-layer",
        type: "circle",
        source: "news-dots",
        paint: {
          "circle-radius": 6,
          "circle-color": [
            "match",
            ["get", "category"],
            "breaking", "#ff0000",
            "recent", "#ffffff",
            "older", "#888888",
            "#000000"
          ]
        }
      });

      // === Hover/click events to trigger React banner ===
      map.on("mouseenter", "news-dots-layer", (e) => {
        if (!e.features || !e.features.length) return;
        const { title, category } = e.features[0].properties;
        setActiveNews({ title, category });
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "news-dots-layer", () => {
        setActiveNews(null);
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "news-dots-layer", (e) => {
        if (!e.features || !e.features.length) return;
        const { title, category } = e.features[0].properties;
        setActiveNews({ title, category });
      });
    });

    return () => {
      map.remove();
    };
  }, [setActiveNews]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
    />
  );
}

export default MapboxGlobe;
