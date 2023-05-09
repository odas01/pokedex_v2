import { MdOutlineNavigateNext } from 'react-icons/md';
import { Tooltip } from 'antd';

import useCurrentStore from '@/zustand/current.store';
import { getImage } from '@/api/pokemon.api';
import { Evolution as EvolutionInterface } from '@/interface';

const Evolution = () => {
   const { evolution, fetchDetail, fetchOtherInfor } = useCurrentStore();

   const handleClick = async (id: number) => {
      await fetchDetail(id);
      fetchOtherInfor();
   };

   let manyEvolutionsArr: Array<EvolutionInterface> = [];
   if (evolution) {
      manyEvolutionsArr = evolution.filter((item) => item.many_evolutions);
   }

   return (
      <div className='flex justify-center w-full'>
         {evolution &&
            evolution
               .filter((item) => !item.many_evolutions)
               .map((item, index) => (
                  <div key={index} className='flex justify-center items-center'>
                     {index > 0 && (
                        <div className='px-4'>
                           <MdOutlineNavigateNext />
                        </div>
                     )}

                     <Tooltip
                        title={item.name[0].toUpperCase() + item.name.slice(1)}
                        color='#000'
                     >
                        <img
                           src={getImage(item.id)}
                           className='max-w-[60px] md:max-w-[50px] xl:max-w-[60px] cursor-pointer'
                           alt={`evolute-${index + 1}`}
                           onClick={() => handleClick(item.id)}
                        />
                     </Tooltip>
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
                        <Tooltip
                           title={
                              item.name[0].toUpperCase() + item.name.slice(1)
                           }
                           color='#000'
                        >
                           <img
                              key={index}
                              src={getImage(item.id)}
                              className={`cursor-pointer max-w-[60px]`}
                              alt={`evolute-${index + 1}`}
                              onClick={() => handleClick(item.id)}
                           />
                        </Tooltip>
                     );
                  })}
               </div>
            </>
         )}
      </div>
   );
};

export default Evolution;
