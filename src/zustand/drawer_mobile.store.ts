import { create } from 'zustand';

type Store = {
   open: boolean;
   setOpen: () => void;
};

const useDrawerMobileStore = create<Store>((set) => ({
   open: false,
   setOpen: () => set((state) => ({ open: !state.open })),
}));

export default useDrawerMobileStore;
