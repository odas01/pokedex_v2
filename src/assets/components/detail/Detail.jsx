import { memo } from 'react';

import Types from '@/components/Types';
import Weaknesses from './Weaknesses';
import Evolution from './Evolution';
import Description from './Description';
import Stat from './Stat';
import Title from './Title';

import useCurrentStore from '@/zustand/current.store';
import { getGif, getImage } from '@/api/pokemon.api';
import { loader, no_pokemon } from '@/assets/images';

function Detail() {
   const { current, loading } = useCurrentStore();

   const image = () => {
      if (!current) return no_pokemon;
      return current.id < 650 ? getGif(current?.id) : getImage(current?.id);
   };

   const urlImage = image();

   return (
      <div
         className='h-full bg-white rounded-none md:rounded-xl shadow-[0_4px_12px_#000] p-4'
         style={{ overflowY: 'overlay' }}
      >
         {!loading ? (
            current ? (
               <>
                  <div className='absolute -top-24 right-1/2 translate-x-1/2'>
                     <img
                        src={urlImage}
                        className='max-w-[350px] lg:max-h-[20vh] max-h-[18vh] h-[200px] object-contain image-rendering'
                        alt='pokemon'
                        // loading='lazy'
                        onError={({ currentTarget }) => {
                           currentTarget.onerror = null; // prevents looping
                           currentTarget.src = no_pokemon;
                        }}
                     />
                  </div>
                  <div className='min-h-full flex flex-col'>
                     <div className='w-full flex justify-between'>
                        {/* HEIGHT */}
                        <span className='px-3 py-1 rounded-lg border bg-gray-200 font-semibold'>
                           {current.height / 10} m
                        </span>

                        {/* WEIGHT */}
                        <span className='px-3 py-1 rounded-lg border bg-gray-200 font-semibold'>
                           {current.weight / 10} kg
                        </span>
                     </div>

                     <div className='pt-6 flex-1 flex flex-col h-full items-center'>
                        {/* ID */}
                        <span className='text-[#919191] text-sm font-semibold'>
                           #{current.id}
                        </span>

                        {/* NAME */}
                        <div className='mt-2 w-full flex justify-center'>
                           <Title name={current.name} />
                        </div>

                        {/* TYPE  & WEAKNESSES */}
                        <div className='flex w-full mt-4'>
                           <div className='flex-1 flex flex-col items-center'>
                              <span className='font-semibold text-sm lg:text-base mb-3'>
                                 Types
                              </span>
                              <Types
                                 types={current.types.map(
                                    (item) => item.type.name
                                 )}
                              />
                           </div>
                           <div className='flex-1 flex flex-col items-center'>
                              <span className='font-semibold text-sm lg:text-base mb-3'>
                                 Weaknesses
                              </span>
                              <Weaknesses />
                           </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className='mt-6 w-3/4'>
                           <Description />
                        </div>

                        {/* STATS */}
                        <div className='mt-auto flex flex-col items-center p-4 w-full '>
                           <span className='font-semibold text-sm lg:text-base mb-3'>
                              Stats
                           </span>
                           <Stat />
                        </div>

                        {/* EVOLUTONS */}
                        <div className='mt-6 flex flex-col items-center w-full'>
                           <span className='font-semibold text-sm lg:text-base mb-3'>
                              Evolutions
                           </span>
                           <Evolution />
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <span className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[#95a5a6]'>
                  Select 1 pokemon on the screens
               </span>
            )
         ) : (
            <div className='flex h-full'>
               <img
                  src={loader}
                  className='m-auto w-12 animate-[spin_0.7s_linear_infinite]'
                  alt='loader'
               />
            </div>
         )}
      </div>
   );
}

export default memo(Detail);
