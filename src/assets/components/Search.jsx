import usePokemonsStore from '@/zustand/pokemons.store';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

function Search() {
   const [value, setValue] = useState('');
   const { reloadPokemons, setSkip, setSearchValue } = usePokemonsStore();

   const handleSearch = (e) => {
      if (e.key === 'Enter') {
         setSkip(0);
         setSearchValue(value);
         reloadPokemons();
      }
   };

   return (
      <div className='flex-1 flex items-center pl-8 pr-2 py-2 h-14 rounded-full shadow-[0px_3px_8px_#8b8888]'>
         <input
            value={value}
            type='text'
            className='flex-1 h-full pr-4 text-base border-r border-[#E3E3E4]'
            placeholder='Enter name or random number...'
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={handleSearch}
         />
         <div className='w-14 h-full ml-4 rounded-full bg-[#FF4742] flex justify-center items-center'>
            <BsSearch color='#fff' />
         </div>
      </div>
   );
}

export default Search;
