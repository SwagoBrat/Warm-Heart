import { useHttp } from '../hooks/useHttp';

const UserService = () => {
    const { request, error, loading, clearError } = useHttp();

    const register = async (body) => {
        const res = await request('/api/auth/register', 'POST', body);
        return res;
    };

    const login = async (body) => {
        const res = await request('/api/auth/login', 'POST', body);
        return res;
    };

    const updateUserLastViewed = async (id, body) => {
        const res = await request(`/api/user/lastViewed/${id}`, 'PATCH', body);
        return res;
    }

    const addUserCart = async (id, body) => {
        const res = await request(`/api/user/cart/${id}`, 'PATCH', body);
        return res;
    }

    const deleteUserCart = async (userId, body) => {
        const res = await request(`/api/user/deletecart/${userId}`, 'PATCH', body);
        return res;
    }

    return { register, login, error, loading, clearError, updateUserLastViewed, addUserCart, deleteUserCart };
};

export default UserService;