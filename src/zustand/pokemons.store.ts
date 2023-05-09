import { create } from 'zustand';
import pokeApi from '@/api/pokemon.api';
import { Pokemon, Type } from '@/interface';

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 100;

type Store = {
   skip: number;
   count: number;
   allPokemon: Array<Pokemon>;
   pokemons: Array<Pokemon>;
   types: Array<Type>;
   searchValue: string;
   loading: boolean;
   setSearchValue: (value: string) => void;
   nextList: () => void;
   previousList: () => void;
   setSkip: (value: number) => void;
   reloadPokemons: () => void;
   fetchAllPokemon: () => void;
   fetchTypes: () => void;
};

const initialValue = {
   skip: DEFAULT_SKIP,
   count: 0,
   allPokemon: [],
   pokemons: [],
   types: [],
   searchValue: '',
   loading: true,
};

const usePokemonsStore = create<Store>((set, get) => ({
   ...initialValue,
   setSearchValue: (value: string) => set({ searchValue: value }),
   nextList: () => set((state) => ({ skip: state.skip + DEFAULT_LIMIT })),
   previousList: () => set((state) => ({ skip: state.skip - DEFAULT_LIMIT })),
   setSkip: (value: number) => set({ skip: value }),
   reloadPokemons: async () => {
      const { skip, searchValue, allPokemon } = get();
      let result = allPokemon;

      // SEARCH
      if (searchValue) {
         result = result.filter((item: any) => {
            const id = item.url.slice(34).replace('/', '');

            // search name or id
            if (
               item.name.includes(searchValue) || //name
               id === searchValue //id
            )
               return item;
         });
      }

      if (window.innerWidth > 768) {
         set({
            pokemons: result.slice(0, skip + DEFAULT_LIMIT),
            count: result.length,
         });
      } else {
         set({
            pokemons: result.slice(skip, skip + DEFAULT_LIMIT),
            count: result.length,
         });
      }
   },
   fetchAllPokemon: async () => {
      if (!get().loading) {
         set({ loading: true });
      }
      try {
         const { results, count }: any = await pokeApi.getAll();
         set({
            allPokemon: results,
            pokemons: results.slice(DEFAULT_SKIP, DEFAULT_SKIP + DEFAULT_LIMIT),
            count,
         });
      } catch (err) {
         console.log(err);
      }
      set({ loading: false });
   },
   fetchTypes: async () => {
      try {
         let res: any = await Promise.all(
            Array.from({ length: 18 }, (_, i) => i + 1).map((id) =>
               pokeApi.getTypes(id)
            )
         );

         const list = res.map(({ name, damage_relations, pokemon }: any) => {
            // hệ giảm sát thương
            const immune = damage_relations.half_damage_from.map(
               (damageItem: any) => damageItem.name
            );

            // hệ không bị ảnh hưởng
            const no_damage = damage_relations.no_damage_from.map(
               (damageItem: any) => damageItem.name
            );

            // hệ chịu tăng x2 sát thương
            const takeX2Damage = damage_relations.double_damage_from.map(
               (damageItem: any) => damageItem.name
            );

            return {
               name,
               immune: immune.concat(no_damage),
               takeX2Damage,
               pokemon: pokemon.map((item: any) => item.pokemon),
            };
         });

         set({ types: list });
      } catch (err) {
         console.log(err);
      }
   },
}));

export default usePokemonsStore;
