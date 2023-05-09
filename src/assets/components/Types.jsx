export const TYPE_BG_COLOR = {
   normal: '#A8A77A',
   fire: '#EE8130',
   water: '#6390F0',
   electric: '#F7D02C',
   grass: '#7AC74C',
   ice: '#96D9D6',
   fighting: '#C22E28',
   poison: '#A33EA1',
   ground: '#E2BF65',
   flying: '#A98FF3',
   psychic: '#F95587',
   bug: '#A6B91A',
   rock: '#B6A136',
   ghost: '#735797',
   dragon: '#6F35FC',
   dark: '#707070', // dark: '#705746',
   steel: '#B7B7CE',
   fairy: '#D685AD',
};

const TYPE_COLOR = {
   ground: '#494141',
   ice: '#494141',
   electric: '#494141',
};

function Types({ types }) {
   return (
      <div className='flex justify-center flex-wrap gap-1 max-w-[200px]'>
         {types.map((type, index) => (
            <Type key={index} type={type} />
         ))}
      </div>
   );
}

function Type({ type }) {
   const typeName = type;

   return (
      <span
         className='text-[10px] font-semibold uppercase flex justify-center items-center rounded w-[56px] h-[24px] md:text-[9px] md:h-[24px] md:w-[50px] xl:min-w-[58px] xl:h-[26px]'
         style={{
            color: TYPE_COLOR[typeName] || '#fff',
            background: TYPE_BG_COLOR[typeName],
         }}
      >
         {typeName}
      </span>
   );
}

export default Types;
