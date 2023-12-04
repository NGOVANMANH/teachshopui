import { useContext } from 'react';
import { Context } from '../contexts';

const useContextData = () => {
    return useContext(Context);
}

export default useContextData;