import axios from "axios";

const getImages = async (query, page) => {
  const res = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query,
      page,
       per_page: 8,
      client_id: "wgQYQmTP2P2fak55_dmG-lrZF9fAU-cLvea-l11POTI",
    },
  });
  return res.data
};

export default getImages;
