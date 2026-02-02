import { useCallback } from "react";

export const useHttp = () => {
    const request = useCallback(async (url = 'http://localhost:3001/plaids', method = 'GET', body = null) => {

        try {
            const response = await fetch(url, { method, body });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            return await response.json()
        } catch (e) {
            throw e;
        }
    }, []);


    return { request }
}