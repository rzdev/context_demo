import {useQuery} from 'react-query';
import axios from 'axios';

const getFilms = async () => {
  const {data} = await axios.get('https://swapi.dev/api/films');
  return data;
};

export default function useFilms() {
  return useQuery('films', getFilms);
}
