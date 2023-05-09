import { loader } from '@/assets/images';

const Loading = () => {
   return (
      <img
         src={loader}
         className='m-auto w-12 animate-[spin_0.7s_linear_infinite]'
         alt='loader'
      />
   );
};

export default Loading;
