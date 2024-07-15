import axios from 'axios';

const API_KEY = 'wgQYQmTP2P2fak55_dmG-lrZF9fAU-cLvea-l11POTI';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get('search/photos', {
    params: {
      query: query,
      page: page
    }
  });

  return data;
};
