import { Row, Col } from 'antd';

import useCurrentStore from '@/zustand/current.store';
const statTitle = [
   {
      name: 'hp',
      bg_color: '#f40000',
   },
   {
      name: 'atk',
      bg_color: '#e74c3c',
   },
   {
      name: 'def',
      color: '#494141',
      bg_color: '#7fff00',
   },
   {
      name: 'spAtk',
      color: '#494141',
      bg_color: '#00e7e7',
   },
   {
      name: 'spDef',
      color: '#494141',
      bg_color: '#45aaf2',
   },
   {
      name: 'speed',
      color: '#494141',
      bg_color: '#f9ca24',
   },
];

function Stat() {
   const { current } = useCurrentStore();
   return (
      <Row
         gutter={[{ xs: 24, md: 24, lg: 12 }, 12]}
         className='w-full px-2 md:px-0'
      >
         {current.stats.map((stat, index) => (
            <Col
               xs={8}
               xl={4}
               md={8}
               key={index}
               className='flex flex-col gap-y-2 items-center w-14'
            >
               <span
                  className='p-1 w-full rounded-full text-sm md:text-[9px] xl:text-[10px] text-center font-semibold capitalize'
                  style={{
                     color: statTitle[index].color || '#fff',
                     backgroundColor: statTitle[index].bg_color,
                  }}
               >
                  {statTitle[index].name}
               </span>
               <span className='text-[#3d3d3d] text-sm md:text-xs xl:text-sm font-semibold'>
                  {stat.base_stat}
               </span>
            </Col>
         ))}
      </Row>
   );
}

export default Stat;
