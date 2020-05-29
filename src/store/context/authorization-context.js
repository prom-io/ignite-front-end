import { createContext } from 'react';
import { store } from '../store';

export const authorizationContext = createContext(store.authorization);
