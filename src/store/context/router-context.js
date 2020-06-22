import { createContext } from 'react';
import { routerStore } from '../router-store';

export const routerContext = createContext(routerStore);
