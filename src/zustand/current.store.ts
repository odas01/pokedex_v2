import { create } from 'zustand';
import pokeApi, { newAxios } from '@/api/pokemon.api';

import { Detail, Species, Evolution } from '@/interface';

interface SpecialForm {
   id: number;
   name: string;
   forms: Array<{
      id: number;
      name: string;
      form_name: string;
   }>;
}

type Store = {
   current: Detail | null;
   species: Species | null;
   evolution: Array<Evolution> | null;
   special_form?: SpecialForm | null;
   loading: boolean;
   setCurrent: (value: Detail) => void;
   setSpecies: (value: Species) => void;
   setSpecialForm: (value: SpecialForm) => void;
   setLoading: (value: boolean) => void;
   fetchDetail: (value: string | number) => void;
   fetchOtherInfor: () => void;
};

const initialValue = {
   current: null,
   species: null,
   evolution: null,
   special_form: null,
   loading: false,
};

const useCurrentStore = create<Store>((set, get) => ({
   ...initialValue,
   setCurrent: (value) => set({ current: value }),
   setSpecies: (value) => set({ species: value }),
   setSpecialForm: (value) => set({ special_form: value }),
   setLoading: (value) => set({ loading: value }),
   fetchDetail: async (value) => {
      try {
         const current: any = await pokeApi.getDetail(value);
         set({ current });
      } catch (err) {
         console.log(err);
      }
   },
   fetchOtherInfor: async () => {
      set({ loading: true });

      try {
         const { current } = get();
         if (current) {
            // GET Species
            const resSpecies = await newAxios(current.species.url);
            set({ species: resSpecies });

            // Tìm các dạng đặc biệt (mega - gmax - alola)
            const special_form = resSpecies.varieties.filter(
               (item: any) => !item.is_default
            );
            let detailArr = await Promise.all(
               special_form.map(({ pokemon }: any) =>
                  pokeApi.getDetail(pokemon.url.slice(34).replace('/', ''))
               )
            );

            let formArr = await Promise.all(
               detailArr.map(async ({ forms }) => await newAxios(forms[0].url))
            );

            if (formArr.length > 0) {
               const forms = formArr.map((item) => {
                  const { form_name, name, names, pokemon } = item;

                  return {
                     id: Number(pokemon.url.slice(34).replace('/', '')),
                     name: names[2]?.name || name,
                     form_name,
                  };
               });

               const special_form: SpecialForm = {
                  id: current.id,
                  name: current.name,
                  forms,
               };
               set({ special_form });
            } else {
               set({ special_form: null });
            }

            // GET Evolution
            let { chain } = await newAxios(resSpecies.evolution_chain.url);

            const format = (
               data: any,
               level: number,
               manyEvolutions: boolean = false
            ) => {
               const format: Evolution = {
                  id: Number(data.species?.url?.slice(42).replace('/', '')),
                  name: data.species.name,
                  level,
                  many_evolutions: manyEvolutions,
                  is_special_form: !!special_form.length,
               };
               return format;
            };

            let evolution: Array<Evolution> = [];
            const level: number = 1;

            // đệ quy
            const recursive: any = (
               chain: any,
               level: number,
               manyEvolutions: boolean = false
            ) => {
               const evolves_to = chain.evolves_to;

               // Nếu không có thể tiến hóa thì thêm nó vào danh sách và thoát hàm
               if (evolves_to.length === 0) {
                  evolution.push(format(chain, level, manyEvolutions));
                  return;
               }

               // Nếu có 1 thể tiến hóa thì thêm nó vào danh sách,  gán nó là thể tiến hóa
               let newChain;
               evolution.push(format(chain, level, manyEvolutions));
               if (evolves_to.length === 1) {
                  newChain = evolves_to[0];
               }

               // Nếu có nhiều hơn 1 thể tiến hóa thì lặp và thêm các thể tiến hóa vào danh sách, sau đó thoát hàm
               if (evolves_to.length > 1) {
                  evolves_to.forEach((item: any) => {
                     recursive(item, level + 1, true);
                  });
                  return;
               }

               return recursive(newChain, level + 1);
            };

            // Lấy các thể tiến hóa của pokemon hiện tại
            recursive(chain, level);

            set({ evolution });
         }
      } catch (err) {
         console.log(err);
      }

      set({ loading: false });
   },
}));

export default useCurrentStore;
