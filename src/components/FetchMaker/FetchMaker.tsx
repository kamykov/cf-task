import { useEffect, useState } from 'react';
import useAsyncError from '../../hooks/useAsyncError';
import { AssetType } from '../ListItem/types';
import { APIProps, FetchMakerState } from './types';

function FetchMaker({ url, limit, filters = [], render }: APIProps) {
    const [state, setState] = useState<FetchMakerState>({
        data: [],
        isLoading: false,
    });

    const throwError = useAsyncError();

    useEffect(() => {
        if (url) {
            getData();
        }
        async function getData() {
            setState((state) => ({ ...state, isLoading: true }));
            let data: Array<AssetType> = [];
            try {
                const response = await fetch(url);
                const { entries } = await response.json();
                data = entries ? entries : [];
            } catch (error) {
                throwError(new Error('Asynchronous error in getData'));
            }

            filters.forEach((filterFn) => {
                data = data.filter(filterFn);
            });

            if (limit) {
                data = data.slice(0, limit);
            }

            setState({ data, isLoading: false });
        }
    }, [url, filters, limit]);

    return render(state);
}

export default FetchMaker;
