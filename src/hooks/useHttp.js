import { useState, useCallback } from "react";
import { useNavigate } from 'react-router';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const request = async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        try {
            const options = {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (response.status === 401 || response.status === 500) {
                localStorage.removeItem('user');
                navigate('/userProfile');
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    };

    const clearError = useCallback(() => setError(null), []);

    return { request, loading, error, clearError };
}