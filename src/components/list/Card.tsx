import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Types from '@/components/Types';

import useCurrentStore from '@/zustand/current.store';
// import useDrawerMobileStore from '@/zustand/drawer_mobile.store';

import { blob, no_pokemon } from '@/assets/images';
import { Detail } from '@/interface';
import { getImage } from '@/api/pokemon.api';

type Props = {
   url: string;
};

const Card: React.FC<Props> = ({ url }) => {
   const [data, setData] = useState<Detail>();

   const { setCurrent, fetchOtherInfor }: any = useCurrentStore();
   // const { setOpen } = useDrawerMobileStore();

   useEffect(() => {
      const getDetail = async () => {
         try {
            const res = (await axios.get(url)).data;
            setData(res);
         } catch (err) {
            console.log(err);
         }
      };
      getDetail();
   }, [url]);

   const handleClick = async () => {
      // if (window.innerWidth < 768) {
      //    setOpen();
      // }
      setCurrent(data);
      await fetchOtherInfor();
   };
   console.log();

   return data ? (
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
            <div className='w-full flex justify-center mb-3'>
               <img
                  src={getImage(data.id)}
                  alt={data.name}
                  className='max-h-[96px] scale-90 md:scale-100 xl:scale-[115%] duration-300 group-hover:scale-125'
                  onError={({ currentTarget }) => {
                     currentTarget.onerror = null; // prevents looping
                     currentTarget.src = no_pokemon;
                  }}
               />
            </div>
            <span className='text-[#919191] text-[13px] md:text-sm font-semibold'>
               #{data.id}
            </span>
            <span className='max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis text-[#000] text-sm md:text-[15px] xl:text-base font-bold uppercase mt-2 md:mt-0'>
               {data.name.replaceAll('-', ' ')}
            </span>
            <div className='mt-2 md:mt-2 xl:mt-4'>
               <Types types={data.types.map((item) => item.type.name)} />
            </div>
         </div>
      </div>
   ) : null;
};

export default Card;
