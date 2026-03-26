import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { layers, namedFlavor } from '@protomaps/basemaps';
import { motion, AnimatePresence } from 'motion/react';
import 'maplibre-gl/dist/maplibre-gl.css';
import dancerEmoji from 'emoji-datasource-apple/img/apple/64/1f483.png';
import beerEmoji from 'emoji-datasource-apple/img/apple/64/1f37b.png';

const bars = [
  {
    id: 'candy-darling',
    name: 'Candy Darling',
    coords: [2.1630, 41.3851],
    address: 'Gran Via de les Corts Catalanes, 586',
    type: 'bar',
    vibe: 'Queer bar & show venue',
    website: null,
  },
  {
    id: 'la-chapelle',
    name: 'La Chapelle',
    coords: [2.1591, 41.3867],
    address: 'Carrer de Muntaner, 67',
    type: 'bar',
    vibe: 'Cocktail bar',
    website: null,
  },
  {
    id: 'punto-bcn',
    name: 'Punto BCN',
    coords: [2.1592, 41.3867],
    address: 'Carrer de Muntaner, 63',
    type: 'bar',
    vibe: 'Classic gay bar',
    website: 'grupoarena.com',
  },
  {
    id: 'moeem',
    name: 'Moeem Barcelona',
    coords: [2.1626, 41.3841],
    address: 'Carrer de Muntaner, 11',
    type: 'bar',
    vibe: 'Gay bar',
    website: 'moeembarcelona.com',
  },
  {
    id: 'gingin',
    name: 'GinGin Gay Queer Bar',
    coords: [2.1606, 41.3876],
    address: 'Carrer d\'Aribau',
    type: 'bar',
    vibe: 'Queer cocktail bar',
    website: 'gingingaybar.com',
  },
  {
    id: 'priscilla-cafe',
    name: 'Priscilla Cafè',
    coords: [2.1610, 41.3877],
    address: 'Carrer del Consell de Cent',
    type: 'bar',
    vibe: 'Café bar',
    website: 'priscillacafe.com',
  },
  {
    id: 'la-carra',
    name: 'La Carrà',
    coords: [2.1610, 41.3856],
    address: 'Carrer de Muntaner, 34',
    type: 'bar',
    vibe: 'Retro gay bar',
    website: 'lacarrabcn.com',
  },
  {
    id: 'strass',
    name: 'Strass Barcelona',
    coords: [2.1589, 41.3838],
    address: 'Carrer de Villarroel, 68',
    type: 'bar',
    vibe: 'Drag bar',
    website: null,
  },
  {
    id: 'la-federica',
    name: 'La Federica',
    coords: [2.1668, 41.3745],
    address: 'Carrer de Salvà, 3',
    type: 'bar',
    vibe: 'Queer cocktail bar',
    website: null,
  },
  {
    id: 'safari-disco-club',
    name: 'Safari Disco Club',
    coords: [2.1449, 41.3783],
    address: 'Carrer de Tarragona, 141',
    type: 'club',
    vibe: 'Queer nightclub',
    website: 'safaridiscoclub.com',
  },
  {
    id: 'believe-club',
    name: 'Believe Club',
    coords: [2.1626, 41.3894],
    address: 'Carrer de Balmes, 56',
    type: 'club',
    vibe: 'Drag nightclub',
    website: 'thebelieve.club',
  },
  {
    id: 'bacon-bear-bar',
    name: 'Bacon Bear Bar',
    coords: [2.1591, 41.3853],
    address: 'Carrer de Casanova, 64',
    type: 'bar',
    vibe: 'Bear bar',
    website: 'baconbearbar.com',
  },
  {
    id: 'la-sastreria',
    name: 'La Sastrería',
    coords: [2.1590, 41.3862],
    address: 'Carrer del Consell de Cent, 245',
    type: 'bar',
    vibe: 'Drag brunch bar',
    website: null,
  },
];

const events = [
  {
    id: 'believe-nights',
    name: 'Nightly Drag Shows',
    tag: 'Every night',
    venue: 'Believe Club',
    price: 'Free entry',
  },
  {
    id: 'strass-bingo',
    name: 'Drag Bingo Sundays',
    tag: 'Every Sunday',
    venue: 'Strass Barcelona',
    price: 'Free entry',
  },
  {
    id: 'sastreria-brunch',
    name: 'Drag Brunch',
    tag: 'Saturdays',
    venue: 'La Sastrería',
    price: '€25',
  },
];

const EventCard = ({ event, index }) => (
  <motion.div
    className="event-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.35 }}
  >
    <div className="event-card-top">
      <div className="event-tag">{event.tag}</div>
    </div>
    <h3 className="event-name">{event.name}</h3>
    <p className="event-venue">{event.venue}</p>

    <div className="event-card-bottom">
      <span className="event-price">{event.price}</span>
    </div>
  </motion.div>
);

const EventsView = () => (
  <motion.div
    key="events"
    className="panel-view events-panel"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="events-header">
      <motion.h1
        className="panel-title"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Events
      </motion.h1>
      <motion.p
        className="panel-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        Barcelona LGBTQ+
      </motion.p>
    </div>
    <div className="events-list">
      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>
  </motion.div>
);

const tabs = [
  {
    id: 'map',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: 'events',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const TabBar = ({ activeTab, onTabChange }) => (
  <div className="tab-bar">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          className="tab-bar-item"
          onClick={() => onTabChange(tab.id)}
        >
          {isActive && (
            <motion.div
              layoutId="tab-blob"
              className="tab-blob"
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            />
          )}
          <motion.div
            animate={isActive ? {
              y: [0, -8, 2, 0],
              scaleX: [1, 0.8, 1.1, 1],
              scaleY: [1, 1.2, 0.9, 1],
            } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ color: isActive ? '#1a1a1a' : '#999', position: 'relative', zIndex: 1 }}
          >
            {tab.icon}
          </motion.div>
        </button>
      );
    })}
  </div>
);

const SAVED_BARS = [
  bars.find(b => b.id === 'safari-disco-club'),
  bars.find(b => b.id === 'candy-darling'),
  bars.find(b => b.id === 'la-federica'),
];

const ProfileView = () => (
  <motion.div
    key="profile"
    className="panel-view profile-panel"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Avatar + name */}
    <motion.div
      className="profile-header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="profile-avatar">A</div>
      <h1 className="profile-name">Alex</h1>
      <p className="profile-location">Barcelona, Spain</p>
    </motion.div>

    {/* Stats row */}
    <motion.div
      className="profile-stats"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.12 }}
    >
      {[{ label: 'Visited', value: '7' }, { label: 'Saved', value: '3' }, { label: 'Reviews', value: '4' }].map(s => (
        <div key={s.label} className="profile-stat">
          <span className="profile-stat-value">{s.value}</span>
          <span className="profile-stat-label">{s.label}</span>
        </div>
      ))}
    </motion.div>

    {/* Saved places */}
    <motion.div
      className="profile-section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
    >
      <h2 className="profile-section-title">Saved</h2>
      <div className="profile-saved-list">
        {SAVED_BARS.map((bar, i) => (
          <motion.div
            key={bar.id}
            className="profile-saved-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 + i * 0.06 }}
          >
            <div className="profile-saved-badge">{bar.name.charAt(0)}</div>
            <div>
              <p className="profile-saved-name">{bar.name}</p>
              <p className="profile-saved-vibe">{bar.vibe}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const markerEls = useRef({});
  const [selectedBar, setSelectedBar] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    Object.entries(markerEls.current).forEach(([id, el]) => {
      el.classList.toggle('map-pin-inner--active', id === selectedBar?.id);
    });
  }, [selectedBar]);

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
      layers: layers('protomaps', namedFlavor('light'), { lang: 'en' }).filter(l => {
        // Drop landuse fills we don't want — keep only parks, urban green, and rail
        const drop = new Set([
          'landuse_hospital', 'landuse_industrial', 'landuse_school',
          'landuse_beach', 'landuse_zoo', 'landuse_aerodrome',
          'landuse_runway', 'roads_runway', 'roads_taxiway',
        ]);
        return !drop.has(l.id);
      })
    };

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: style,
        center: [2.1580, 41.3835],
        zoom: 13.5,
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
      const inner = document.createElement('div');
      inner.className = `map-pin-inner map-pin--${bar.type}`;
      const img = document.createElement('img');
      img.src = bar.type === 'club' ? dancerEmoji : beerEmoji;
      img.width = 28;
      img.height = 28;
      img.draggable = false;
      inner.appendChild(img);
      el.appendChild(inner);
      markerEls.current[bar.id] = inner;

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
        {activeTab === 'events' && <EventsView />}
      </AnimatePresence>

      {/* Profile view */}
      <AnimatePresence>
        {activeTab === 'profile' && <ProfileView />}
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

              <motion.a
                className="bar-card-gmaps"
                href="#"
                onClick={e => e.preventDefault()}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.3 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Open in Google Maps
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Map;
