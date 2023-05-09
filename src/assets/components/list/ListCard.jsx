import { Row, Col } from 'antd';

import Card from '@/components/list/Card.jsx';

import usePokemonsStore from '@/zustand/pokemons.store';
import Loading from '../Loading';

function ListCard() {
   const { pokemons, loading } = usePokemonsStore();
   return (
      <>
         <Row gutter={[{ xl: 24, xs: 12 }, 50]}>
            {pokemons &&
               pokemons.map((item, index) => (
                  <Col key={index} xl={8} sm={8} md={12} xs={12}>
                     <Card url={item.url} />
                  </Col>
               ))}
         </Row>
         {loading && (
            <div className='flex h-10'>
               <Loading />
            </div>
         )}
      </>
   );
}

export default ListCard;
