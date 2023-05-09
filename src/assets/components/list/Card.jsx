import { useEffect, useState } from 'react';

import Types from '@/components/Types';

import useCurrentStore from '@/zustand/current.store';
import useDrawerMobileStore from '@/zustand/drawer_mobile.store';

import { newAxios } from '@/api/pokemon.api';
import { blob } from '@/assets/images';

function Card({ url }) {
   const { setCurrent, fetchOtherInfor } = useCurrentStore();
   const { setOpen } = useDrawerMobileStore();

   const [data, setData] = useState(null);

   useEffect(() => {
      const getDetail = async () => {
         try {
            const res = await newAxios(url);
            setData(res);
         } catch (err) {
            console.log(err);
         }
      };
      getDetail();
   }, [url]);

   const handleClick = async () => {
      if (window.innerWidth < 768) {
         setOpen();
      }
      setCurrent(data);
      await fetchOtherInfor();
   };

   return (
      data && (
         <div
            className='relative rounded-md cursor-pointer group'
            onClick={handleClick}
         >
            <div className='overflow-hidden'>
               <img
                  src={blob}
                  alt={`blob-${data.name}`}
                  className='scale-[120%] xl:scale-95'
               />
            </div>
            <div className='absolute -top-5 xl:top-0 right-0 w-full h-full flex flex-col items-center'>
               <div className='w-full flex justify-center'>
                  <img
                     src={data?.sprites.front_default}
                     alt={data.name}
                     className='scale-90 md:scale-100 xl:scale-[115%] duration-300 group-hover:scale-125'
                  />
               </div>
               <span className='text-[#919191] text-[13px] md:text-sm font-semibold'>
                  #{data.id}
               </span>
               <span className='text-[#000] text-sm md:text-[15px] xl:text-base font-bold uppercase mt-2 md:mt-0'>
                  {data.name}
               </span>
               <div className='mt-2 md:mt-2 xl:mt-4'>
                  <Types types={data.types.map((item) => item.type.name)} />
               </div>
            </div>
         </div>
      )
   );
}

export default Card;
