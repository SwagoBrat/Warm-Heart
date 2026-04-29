import { useHttp } from '../hooks/useHttp'

const usePlaidsFilterService = () => {

    const { request, loading, error, clearError } = useHttp();

    const filterLoading = loading;
    const errorFilters = error

    const getAllFilters = async () => {
        const res = await request('/api/filters/getAllFilters')
        return res.filters;
    }

    return {
        getAllFilters,
        filterLoading,
        errorFilters,
        clearError
    }
}

export default usePlaidsFilterService