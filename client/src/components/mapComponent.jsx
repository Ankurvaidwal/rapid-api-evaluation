import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import fetchCoordinates from '../utils/fetchCoordinatesBatch';

const MapComponent = ({ cities }) => {
    const [viewport, setViewport] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 2,
        width: '100vw',
        height: '100vh',
    });
    const [locations, setLocations] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const getCoordinates = async () => {
            const coordinates = await fetchCoordinates(cities);
            setLocations(coordinates);
        };

        getCoordinates();
    }, [cities]);

    const api_token = import.meta.env.VITE_MAPBOX_TOKEN
    return (
        <Map
            style={{ width: '80vw', height: '80vh' }}
            {...viewport}
            mapboxAccessToken={api_token}
            onMove={evt => setViewport(evt.viewState)}
            // onViewPortChange={handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            {locations.map(({ lat, lng, cityName, personName }) => (
                <Marker key={cityName} latitude={lat} longitude={lng}>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCity({ cityName, personName, lat, lng })
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <div style={{ color: 'red' }}>📍</div>
                    </div>
                </Marker>
            ))}

            {selectedCity && (
                <Popup
                    latitude={selectedCity.lat}
                    longitude={selectedCity.lng}
                    onClose={() => setSelectedCity(null)}
                >
                    <div className='p-2 bg-purple-500 text-white rounded text-lg'>
                        <h3>city: {selectedCity.cityName}</h3>
                        <p> customer name :{selectedCity.personName}</p>
                    </div>
                </Popup>
            )}
        </Map>
    );
};

export default MapComponent;
