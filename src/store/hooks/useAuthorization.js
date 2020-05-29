import { useContext } from 'react';
import { authorizationContext } from '../context/authorization-context';

export const useAuthorization = () => useContext(authorizationContext);
