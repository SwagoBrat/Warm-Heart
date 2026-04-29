import { useHttp } from "../hooks/useHttp"

const usePlaidsService = () => {

    const { request, loading, error, clearError } = useHttp();

    const getProductImg = async () => {
        const res = await request('/api/products/getProductImg');
        return res.result;
    }

    const getProductData = async (color = '', size = '', price = '', offset = 0, limit = 6) => {
        const res = await request(`/api/products/getAllProducts?offset=${offset}&limit=${limit}&color=${color}&size=${size}&price=${price}`)
        return [res.data, res.total];
    }

    const getProductById = async (id) => {
        const res = await request(`/api/products/getById/${id}`)
        return await res
    }

    const getRandomProducts = async () => {
        const res = await request(`/api/products/getRandProducts`);
        return res.data;
    }

    const getAlsoLikedProducts = async (id, limit = 8, size) => {
        const res = await request(`/api/products/alsoLike?id=${id}&limit=${limit}&size=${size}`)
        return res.data;
    }


    return { error, loading, clearError, getProductData, getProductById, getProductImg, getRandomProducts, getAlsoLikedProducts }

}

export default usePlaidsService;