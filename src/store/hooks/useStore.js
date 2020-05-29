import { useContext } from 'react';
import { storeContext } from '../context/store-context';

export const useStore = () => useContext(storeContext);
