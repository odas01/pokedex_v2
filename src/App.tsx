import { useEffect } from 'react';
import { Row, Col, Drawer, Affix } from 'antd';

import Search from '@/components/Search.jsx';
import ListCard from '@/components/list/ListCard.jsx';
import Detail from '@/components/detail/Detail.jsx';

import usePokemonsStore from '@/zustand/pokemons.store.ts';
import useDrawerMobileStore from '@/zustand/drawer_mobile.store.ts';

import { bg } from '@/assets/images';

const DEFAULT_LIMIT = 100;

function App() {
   const { count, skip, nextList, previousList } = usePokemonsStore();
   const { open, setOpen } = useDrawerMobileStore();

   const { fetchAllPokemon, fetchTypes, reloadPokemons } = usePokemonsStore();

   // fetch all pokemon and all type
   useEffect(() => {
      fetchAllPokemon();
      fetchTypes();
   }, []);

   // reload data
   useEffect(() => {
      if (skip !== 0) {
         reloadPokemons();
      }
   }, [skip]);

   // load more
   const handleLoadMore = () => {
      nextList();
      if (window.innerHeight > 768) {
         window.scrollTo(0, 0);
      }
   };

   const handlePrevious = () => {
      if (skip > 0) {
         window.scrollTo(0, 0);
         previousList();
      }
   };

   return (
      <div
         className='p-4 pb-14 md:pt-8 xl:p-10 xl:pt-6'
         style={{ backgroundImage: `url(${bg})` }}
      >
         <div className='max-w-[1400px] mx-auto min-h-screen'>
            <Row gutter={[{ md: 30, lg: 50 }, {}]}>
               <Col lg={15} md={13} xs={24}>
                  <Search />
                  <p className='md:hidden pt-4 text-base text-center text-[#919191] font-semibold'>
                     {skip + DEFAULT_LIMIT > count
                        ? count
                        : skip + DEFAULT_LIMIT}{' '}
                     / {count}
                  </p>
                  <div className='pt-6'>
                     <ListCard />
                     {skip + DEFAULT_LIMIT <= count && (
                        <div className='hidden md:inline-block xl:flex mt-4  justify-center items-center gap-5'>
                           <button
                              className='py-2 px-6 bg-[#FF6B6B] text-white text-base rounded-lg uppercase'
                              onClick={handleLoadMore}
                           >
                              Loadmore
                           </button>
                           <p className='py-4 text-base text-[#919191] font-semibold'>
                              {skip + DEFAULT_LIMIT > count
                                 ? count
                                 : skip + DEFAULT_LIMIT}{' '}
                              / {count}
                           </p>
                        </div>
                     )}
                  </div>
               </Col>
               <Col lg={9} md={11} xs={0}>
                  <p className='py-4 text-base text-[#919191] font-semibold'>
                     {skip + DEFAULT_LIMIT > count
                        ? count
                        : skip + DEFAULT_LIMIT}{' '}
                     / {count}
                  </p>
                  <Affix offsetTop={100}>
                     <div className='h-[84vh]'>
                        <Detail />
                     </div>
                  </Affix>
               </Col>
            </Row>

            {/* Mobile */}
            {window.innerWidth < 768 && (
               <Drawer
                  height='85%'
                  placement='bottom'
                  autoFocus={false}
                  open={open}
                  headerStyle={{
                     display: 'none',
                  }}
                  bodyStyle={{
                     padding: 0,
                  }}
                  footerStyle={{
                     padding: 0,
                  }}
                  footer={
                     <p
                        className='text-center py-1 bg-gray-400 text-base font-semibold'
                        onClick={setOpen}
                     >
                        Close
                     </p>
                  }
                  onClose={setOpen}
               >
                  <Detail />
               </Drawer>
            )}
         </div>

         {/* Mobile */}
         <div className='md:hidden fixed bottom-0 right-0 left-0 flex text-base font-semibold bg-[#ff6b6b] text-white'>
            <button
               className={`border-r flex-1 py-2 ${
                  skip === 0 ? 'bg-[#ccc] text-[#666]' : ''
               }`}
               disabled={skip === 0}
               onClick={handlePrevious}
            >
               Previous
            </button>
            <button className='border-l flex-1 py-2' onClick={handleLoadMore}>
               Next
            </button>
         </div>
      </div>
   );
}

export default App;
