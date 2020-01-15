import axios from 'axios';

const API_SERVER = 'http://localhost:3000';

export function fetchAlbums(page, pageSize) {
  return axios.get(`${API_SERVER}/albums`, {
    params: {
      page,
      pageSize
    }
  });
}
