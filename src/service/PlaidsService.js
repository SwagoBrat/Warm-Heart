import { useHttp } from "../hooks/useHttp"

const usePlaidsService = () => {

    const { request } = useHttp();

    const getAllPliads = async () => {
        const res = await request()
        return res.map(_transformPlaids);
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
    return { getAllPliads }
}

export default usePlaidsService;