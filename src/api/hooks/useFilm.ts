import {useQuery} from 'react-query';
import axios from 'axios';

const getFilmById = async (_key: string, FilmId: number) => {
  console.log('getFilmById');
  const {data} = await axios.get(`https://swapi.dev/api/films/${FilmId}`);
  return data;
};

export default function usePost(FilmId: number) {
  return useQuery(['film', FilmId], getFilmById, {staleTime: 3000});
}
