import { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

export default function useLocation() {
  return useContext(LocationContext);
}
