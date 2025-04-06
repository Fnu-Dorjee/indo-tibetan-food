

import { useState, useEffect, useCallback } from "react";


async function sendHttpRequest(url,config){
    const response = await fetch(url, config);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong, failed to send requests.');
    }

    return data;
}


export default function useHttp(url, config, initialData){
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async function sendRequest(data){
            setIsLoading(true);
            try{
                const restData = await sendHttpRequest(url, {...config, body: data});
                setData(restData);
            }catch(error){
                setError(error.message || 'something went wrong!');
            }
            setIsLoading(false);
        },[url,config]);

    useEffect(()=>{
        if((config && (config.method === 'GET' || !config.method)) ||!config){
            sendRequest();
        }
    },[sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
};