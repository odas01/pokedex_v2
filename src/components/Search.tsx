import usePokemonsStore from '@/zustand/pokemons.store';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
   const [value, setValue] = useState<string>('');

   const { reloadPokemons, setSkip, setSearchValue } = usePokemonsStore();

   const handleSearch = () => {
      setSkip(0);
      setSearchValue(value);
      reloadPokemons();
   };

   return (
      <div className='flex-1 flex items-center pl-8 pr-2 py-2 h-12 xl:h-14 rounded-full bg-white shadow-[0px_3px_8px_#8b8888]'>
         <input
            value={value}
            type='text'
            className='flex-1 h-full pr-4 text-sm xl:text-base border-r border-[#E3E3E4]'
            placeholder='Enter name or random number...'
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
         />
         <div
            className='w-14 h-full ml-4 rounded-full bg-[#FF4742] flex justify-center items-center hover:opacity-60 duration-200 cursor-pointer'
            onClick={handleSearch}
         >
            <BsSearch color='#fff' />
         </div>
      </div>
   );
};

export default Search;
