import { useState, useCallback } from "react";
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = async (url, method = 'GET', body = null) => {

        setLoading(true);

        try {
            const response = await fetch(url, { method, body });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            setLoading(false);
            return await response.json()
        } catch (e) {
             setLoading(false);
            setError(e.message);
            throw e;
        }
    };

    const clearError = useCallback(() => setError(null), []);


    return { request, loading, error, clearError }
}
