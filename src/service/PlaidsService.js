import { useHttp } from "../hooks/useHttp"

const usePlaidsService = () => {

    const { request,loading, error,clearError  } = useHttp();

    const getAllPliads = async () => {
        const res = await request('http://localhost:3001/plaids')
        return await res.map(_transformPlaids);
    }

    const postEmail = async (email) => {
        const res = await request('http://localhost:3001/emails', 'POST', JSON.stringify(email));
        return await res;
    }

    const getAllFilters = async () => {
        const res = await request('http://localhost:3001/filter');
        return await res;
    }

    const _transformPlaids = (plaid) => {
        return {
            img: plaid.img.replace(/"/g, ''),
            id: +plaid.id,
            title: plaid.title,
            size: plaid.size,
            price: plaid.price
        }
    }
    return { getAllPliads, postEmail, getAllFilters, error, loading, clearError }

}

export default usePlaidsService;