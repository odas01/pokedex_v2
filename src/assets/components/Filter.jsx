import usePokemonsStore from '@/zustand/pokemons.store';
import { Col, Radio, Row } from 'antd';
import { TYPE_BG_COLOR } from '@/components/Types';

function Filter() {
   const { types, filterType, setFilterType, setSkip, reloadPokemons } =
      usePokemonsStore();

   const handleFilter = (e) => {
      setSkip(0);
      setFilterType(e.target.value);
      reloadPokemons();
   };

   return (
      <Radio.Group onChange={handleFilter} value={filterType}>
         <Row gutter={[10, 10]}>
            {types.map((item, index) => (
               <Col key={index} span={4}>
                  <Radio value={item.name}>
                     <span style={{ color: TYPE_BG_COLOR[item.name] }}>
                        {item.name}
                     </span>
                  </Radio>
               </Col>
            ))}
         </Row>
      </Radio.Group>
   );
}

export default Filter;
