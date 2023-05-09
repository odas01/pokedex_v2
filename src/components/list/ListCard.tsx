import { Row, Col } from 'antd';

import Card from '@/components/list/Card.tsx';

import usePokemonsStore from '@/zustand/pokemons.store';
import Loading from '../Loading';

const ListCard = () => {
   const { pokemons, loading } = usePokemonsStore();

   return (
      <>
         {pokemons.length > 0 ? (
            <Row gutter={[{ xl: 24, xs: 12 }, 50]}>
               {pokemons.map((item, index) => (
                  <Col key={index} xl={8} sm={8} md={12} xs={12}>
                     <Card url={item.url} />
                  </Col>
               ))}
            </Row>
         ) : (
            <p className='text-center text-lg text-[#919191] font-semibold'>
               No pokemons
            </p>
         )}
         {loading && (
            <div className='flex h-10'>
               <Loading />
            </div>
         )}
      </>
   );
};

export default ListCard;
