import { useEffect, useState, memo } from 'react';
import useCurrentStore from '@/zustand/current.store';

function Description() {
   const { species } = useCurrentStore();
   const [description, setDescription] = useState('');

   useEffect(() => {
      if (species) {
         let textFound = species.flavor_text_entries.find(
            (item) =>
               item.language.name === 'en' && item.version.name === 'sword'
         )?.flavor_text;
         if (!textFound) {
            textFound = species.flavor_text_entries.find(
               (item) =>
                  item.language.name === 'en' && item.version.name === 'x'
            )?.flavor_text;
         }
         if (!textFound) {
            textFound = species.flavor_text_entries.find(
               (item) => item.language.name === 'en'
            )?.flavor_text;
         }
         setDescription(textFound || 'No description...');
      }
   }, [species]);

   return (
      <p className='text-[#919191] text-center font-medium text-dots md:text-[13px]'>
         {description}
      </p>
   );
}

export default memo(Description);
