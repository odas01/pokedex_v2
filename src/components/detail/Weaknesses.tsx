import { useEffect, useState, memo } from 'react';

import Types from '@/components/Types';

import useCurrentStore from '@/zustand/current.store';
import usePokemonsStore from '@/zustand/pokemons.store';
import { Type } from '@/interface';

const Weaknesses = () => {
   const [weaknesses, setWeaknesses] = useState<Array<string>>([]);

   const { current } = useCurrentStore();
   const { types } = usePokemonsStore();

   useEffect(() => {
      const weaknessFilter = () => {
         const typePokeActive = current?.types.map((typeActive) => {
            return types.find((type) => type.name === typeActive.type.name);
         });

         if (typePokeActive) {
            const { takeX2Damage, immune }: any = typePokeActive.reduce(
               (cur, item: any, index) => {
                  if (index === 0) {
                     return item;
                  }

                  return {
                     immune: Array.from(
                        new Set(cur?.immune.concat(item.immune))
                     ),
                     takeX2Damage: Array.from(
                        new Set(cur?.takeX2Damage.concat(item.takeX2Damage))
                     ),
                  };
               },
               {} as Type
            );

            setWeaknesses(
               takeX2Damage.filter((type: string) => !immune.includes(type))
            );
         }
      };
      weaknessFilter();
   }, [current]);
   console.log(weaknesses);

   return <Types types={weaknesses} />;
};

export default memo(Weaknesses);
