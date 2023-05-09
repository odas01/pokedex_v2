import { useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import useCurrentStore from '@/zustand/current.store';

type Props = {
   name: string;
};

const Title: React.FC<Props> = ({ name }) => {
   const [title, setTitle] = useState<string>(name);
   const [show, setShow] = useState<boolean>(false);

   const { special_form, fetchDetail } = useCurrentStore();

   const handleClick = async (item: any) => {
      setTitle(item.name);
      await fetchDetail(item.id);

      setShow(false);
   };

   return (
      <div className='relative min-w-[75%] text-center text-[#000] text-base font-bold mt-2'>
         <div
            onClick={() => setShow(!show)}
            className={`relative py-1 ${
               special_form
                  ? 'cursor-pointer bg-gray-500 text-white rounded'
                  : ''
            }`}
         >
            <span className='uppercase md:text-sm lg:text-base'>
               {title.replaceAll('-', ' ')}
            </span>
            {special_form && (
               <div className='absolute right-3 top-0'>
                  {!show ? (
                     <CaretDownOutlined size={18} />
                  ) : (
                     <CaretUpOutlined size={18} />
                  )}
               </div>
            )}
         </div>
         <div
            className={`absolute top-[130%] max-h-64 rounded w-full bg-white z-10 shadow-[0_2px_8px_0_#000] overflowY-overlay ${
               !!special_form && show ? 'block' : 'hidden'
            }`}
         >
            <p
               className='py-2 capitalize cursor-pointer duration-150 md:text-sm lg:text-base hover:bg-gray-700 hover:text-white'
               onClick={() => handleClick(special_form)}
            >
               {special_form?.name.replaceAll('-', ' ')}
            </p>
            {special_form?.forms.map((item, index) => (
               <p
                  key={index}
                  className='py-2 capitalize cursor-pointer duration-150 md:text-sm lg:text-base hover:bg-gray-700 hover:text-white'
                  onClick={() => handleClick(item)}
               >
                  {item.name.replaceAll('-', ' ')}
               </p>
            ))}
         </div>
      </div>
   );
};

export default Title;
