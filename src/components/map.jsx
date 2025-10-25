import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { layers, namedFlavor } from '@protomaps/basemaps';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const style = {
      version: 8,
      glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
      sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
      sources: {
        protomaps: {
          type: 'vector',
          tiles: [
            'https://api.protomaps.com/tiles/v4/{z}/{x}/{y}.mvt?key=bed51c2a304a2717'
          ],
          maxzoom: 15,
          attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
      },
      layers: layers('protomaps', namedFlavor('light'), { lang: 'en' })
    };

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: style,
        center: [2.1686, 41.3874], // Barcelona
        zoom: 13,
        attributionControl: true
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add error handling
      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
      });

    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '100dvh',
        position: 'relative'
      }} 
    />
  );
};

export default Map;