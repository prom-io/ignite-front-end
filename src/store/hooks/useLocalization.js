import { useContext } from 'react';
import { localizationContext } from '../context/localization-context';

export const useLocalization = () => useContext(localizationContext);
