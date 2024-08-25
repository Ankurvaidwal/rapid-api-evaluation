import axios from 'axios';

const fetchCoordinates = async (cities) => {
  const token = import.meta.env.VITE_MAPBOX_TOKEN
  const requests = cities.map(cityData => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityData.city)}.json?access_token=${token}`;
    return axios.get(url);
  });

  try {
    const responses = await Promise.all(requests);
    return responses.map((response, index) => {
      const [lng, lat] = response.data.features[0].center;
      return {
        lat,
        lng,
        cityName: cities[index].city,
        personName: cities[index].name
      };
    });
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return [];
  }
};

export default fetchCoordinates;
