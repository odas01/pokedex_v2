import { MdOutlineNavigateNext } from 'react-icons/md';

import useCurrentStore from '@/zustand/current.store';
import { getImage } from '@/api/pokemon.api';

function Evolution() {
   const { evolution, fetchDetail, fetchOtherInfor } = useCurrentStore();

   const handleClick = async (id) => {
      await fetchDetail(id);
      fetchOtherInfor();
   };

   const manyEvolutionsArr = evolution.filter((item) => item.many_evolutions);

   return (
      <div className='flex justify-center w-full'>
         {evolution
            .filter((item) => !item.many_evolutions)
            .map((item, index) => (
               <div key={index} className='flex justify-center items-center'>
                  {index > 0 && (
                     <div className='px-4'>
                        <MdOutlineNavigateNext />
                     </div>
                  )}
                  <img
                     src={getImage(item.id)}
                     className='max-w-[60px] md:max-w-[50px] xl:max-w-[60px] cursor-pointer'
                     alt={`evolute-${index + 1}`}
                     onClick={() => handleClick(item.id)}
                  />
               </div>
            ))}
         {manyEvolutionsArr.length > 0 && (
            <>
               <div className='my-auto px-4'>
                  <MdOutlineNavigateNext />
               </div>
               <div
                  className={`flex justify-center max-w-[260px] ${
                     manyEvolutionsArr.length > 2
                        ? 'flex-wrap'
                        : 'flex-col px-[10px]'
                  }`}
               >
                  {manyEvolutionsArr.map((item, index) => {
                     return (
                        <img
                           key={index}
                           src={getImage(item.id)}
                           className={`cursor-pointer max-w-[60px]`}
                           alt={`evolute-${index + 1}`}
                           onClick={() => handleClick(item.id)}
                        />
                     );
                  })}
               </div>
            </>
         )}
      </div>
   );
}

export default Evolution;
