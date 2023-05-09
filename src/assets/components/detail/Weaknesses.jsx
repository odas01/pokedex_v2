import { useEffect, useState, memo } from 'react';

import Types from '@/components/Types';

import useCurrentStore from '@/zustand/current.store';
import usePokemonsStore from '@/zustand/pokemons.store';

function Weaknesses() {
   const [weaknesses, setWeaknesses] = useState([]);

   const { current } = useCurrentStore();
   const { types } = usePokemonsStore();

   useEffect(() => {
      const weaknessFilter = () => {
         const typePokeActive = current.types.map((typeActive) => {
            return types.find((type) => type.name === typeActive.type.name);
         });
         if (typePokeActive.length > 0) {
            const { immune, takeX2Damage } = typePokeActive.reduce(
               (cur, item, index) => {
                  if (index === 0) {
                     return item;
                  }
                  return {
                     immune: Array.from(
                        new Set(cur.immune.concat(item.immune))
                     ),
                     takeX2Damage: Array.from(
                        new Set(cur.takeX2Damage.concat(item.takeX2Damage))
                     ),
                  };
               },
               {}
            );
            setWeaknesses(takeX2Damage.filter((x) => !immune.includes(x)));
         } else setWeaknesses(typePokeActive.takeX2Damage);
      };
      weaknessFilter();
   }, [current]);

   return <Types types={weaknesses} />;
}

export default memo(Weaknesses);
