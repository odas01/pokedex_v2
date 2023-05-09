import axios from 'axios';
import axiosConfig from './axios.config';

export const getGif = (id: number) =>
   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

export const getImage = (id: number) =>
   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const pokeApi = {
   getAll: async () => await axiosConfig.get('/pokemon?offset=0&limit=10000'),
   loadPokemon: async (skip: number, limit: number) =>
      await axiosConfig.get(`/pokemon?offset=${skip}&limit=${limit}`),

   getDetail: async (value: string | number) =>
      await axiosConfig.get(`/pokemon/${value}`),

   getSpecies: async (value: string | number) =>
      await axiosConfig.get(`/pokemon-species/${value}`),

   getTypes: async (value: string | number) =>
      await axiosConfig.get(`/type/${value}`),

   getForm: async (value: string | number) =>
      await axiosConfig.get(`/pokemon-form/${value}`),
};

export const newAxios = async (url: string) => (await axios.get(url)).data;

export default pokeApi;
