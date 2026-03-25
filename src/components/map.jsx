import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { layers, namedFlavor } from '@protomaps/basemaps';
import { motion, AnimatePresence } from 'motion/react';
import 'maplibre-gl/dist/maplibre-gl.css';

const bars = [
  {
    id: 'safari-disco-club',
    name: 'Safari Disco Club',
    coords: [2.1449, 41.3783],
    address: 'Carrer de Tarragona, 141',
    description: 'A vibrant queer nightclub with a sexual anti-harassment policy and a fierce, inclusive dancefloor. One of Barcelona\'s most progressive party spaces.',
    vibe: 'Queer nightclub',
    website: 'safaridiscoclub.com',
  },
  {
    id: 'believe-club',
    name: 'Believe Club',
    coords: [2.1626, 41.3894],
    address: 'Carrer de València, 156',
    description: 'A newer addition to the Gaixample scene with a sleek interior and big-room energy. Multiple floors, themed nights, and open almost every day of the week.',
    vibe: 'Modern nightclub',
    website: 'thebelieve.club',
  },
  {
    id: 'bacon-bear-bar',
    name: 'Bacon Bear Bar',
    coords: [2.1591, 41.3853],
    address: 'Carrer de Casanova, 64',
    description: 'The bear bar of the Gaixample — friendly, hairy, and unpretentious. Strong pours, a loyal crowd, and one of the best terraces in the neighborhood.',
    vibe: 'Bear bar',
    website: 'baconbearbar.com',
  },
];

const TabBar = ({ activeTab, onTabChange }) => (
  <div className="tab-bar">
    <button
      className={`tab-bar-item ${activeTab === 'map' ? 'active' : ''}`}
      onClick={() => onTabChange('map')}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
      <span>Map</span>
    </button>
    <button
      className={`tab-bar-item ${activeTab === 'events' ? 'active' : ''}`}
      onClick={() => onTabChange('events')}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
      <span>Events</span>
    </button>
    <button
      className={`tab-bar-item ${activeTab === 'profile' ? 'active' : ''}`}
      onClick={() => onTabChange('profile')}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span>Profile</span>
    </button>
  </div>
);

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [selectedBar, setSelectedBar] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    if (map.current) return;

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
        center: [2.1555, 41.3845],
        zoom: 14,
        attributionControl: false
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      map.current.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '' }), 'top-left');

      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        addMarkers();
      });

    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    return () => {
      markersRef.current.forEach(m => m.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addMarkers = () => {
    bars.forEach((bar) => {
      const el = document.createElement('div');
      el.className = 'map-pin';
      el.innerHTML = `
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.059 0 0 8.059 0 18c0 12.627 16.5 25.125 17.227 25.707a1.286 1.286 0 001.546 0C19.5 43.125 36 30.627 36 18 36 8.059 27.941 0 18 0z" fill="#E91E63"/>
          <circle cx="18" cy="18" r="8" fill="white"/>
          <circle cx="18" cy="18" r="4" fill="#E91E63"/>
        </svg>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const point = map.current.project(bar.coords);
        setCardPosition({ x: point.x, y: point.y });
        setSelectedBar(prev => prev?.id === bar.id ? null : bar);

        const containerHeight = mapContainer.current.clientHeight;
        map.current.flyTo({
          center: bar.coords,
          zoom: 16,
          duration: 600,
          offset: [0, -containerHeight * 0.15],
        });
      });

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(bar.coords)
        .addTo(map.current);

      markersRef.current.push(marker);
    });
  };

  const handleMapClick = () => {
    setSelectedBar(null);
  };

  return (
    <div style={{ width: '100%', height: '100dvh', position: 'relative' }}>
      {/* Map — always mounted so it doesn't re-init */}
      <div
        ref={mapContainer}
        onClick={handleMapClick}
        style={{
          width: '100%',
          height: '100%',
          display: activeTab === 'map' ? 'block' : 'none',
        }}
      />

      {/* Events view */}
      <AnimatePresence>
        {activeTab === 'events' && (
          <motion.div
            key="events"
            className="panel-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="panel-title">Events</h1>
            <p className="panel-subtitle">Coming soon</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile view */}
      <AnimatePresence>
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            className="panel-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="panel-title">Profile</h1>
            <p className="panel-subtitle">Coming soon</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bar card overlay — only on map tab */}
      <AnimatePresence>
        {activeTab === 'map' && selectedBar && (
          <motion.div
            key={selectedBar.id}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.8,
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              left: 16,
              right: 16,
              maxWidth: 420,
              margin: '0 auto',
              zIndex: 10,
            }}
          >
            <div className="bar-card">
              <div className="bar-card-header">
                <motion.div
                  className="bar-card-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {selectedBar.vibe.split(' ')[0].charAt(0)}
                </motion.div>
                <div>
                  <motion.h2
                    className="bar-card-title"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.3 }}
                  >
                    {selectedBar.name}
                  </motion.h2>
                  <motion.p
                    className="bar-card-vibe"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14, duration: 0.3 }}
                  >
                    {selectedBar.vibe}
                  </motion.p>
                </div>
                <button
                  className="bar-card-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBar(null);
                  }}
                >
                  &times;
                </button>
              </div>

              <motion.p
                className="bar-card-description"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
              >
                {selectedBar.description}
              </motion.p>

              <motion.div
                className="bar-card-details"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
              >
                <div className="bar-card-detail">
                  <span className="bar-card-label">Address</span>
                  <span>{selectedBar.address}</span>
                </div>
                {selectedBar.website && (
                  <div className="bar-card-detail">
                    <span className="bar-card-label">Web</span>
                    <span>{selectedBar.website}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Map;
