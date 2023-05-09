import { useEffect, useState, memo } from 'react';

import useCurrentStore from '@/zustand/current.store';

const Description = () => {
   const [description, setDescription] = useState<string>('');

   const { species } = useCurrentStore();

   useEffect(() => {
      if (species) {
         let textFound = species.flavor_text_entries.find(
            (item: any) =>
               item.language.name === 'en' && item.version.name === 'sword'
         )?.flavor_text;
         if (!textFound) {
            textFound = species.flavor_text_entries.find(
               (item: any) =>
                  item.language.name === 'en' && item.version.name === 'x'
            )?.flavor_text;
         }
         if (!textFound) {
            textFound = species.flavor_text_entries.find(
               (item: any) => item.language.name === 'en'
            )?.flavor_text;
         }
         setDescription(textFound || 'No description...');
      }
   }, [species]);

   return (
      <p className='text-[#919191] text-center italic font-semibold text-dots text-[13px] xl:text-sm'>
         {description}
      </p>
   );
};

export default memo(Description);
