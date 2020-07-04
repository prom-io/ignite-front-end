import { useContext } from 'react';
import { routerContext } from '../context/router-context';

export const useRouter = () => useContext(routerContext);
