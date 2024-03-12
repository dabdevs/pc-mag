import { createContext, useState, useEffect, useContext } from "react";
import { getProducts } from "../api/products";
import { useSearchParams } from "react-router-dom";

const ProductsContext = createContext({})

export function useProductsContext() {
    return useContext(ProductsContext);
}

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [sort, setSort] = useState('')
    const [unfilteredProducts, setUnfilteredProducts] = useState([])
    const [search, setSearch] = useState()
    //const { keyword } = useLocation()
    //const [searchParams, setSearchParams] = useSearchParams()
    //const category = searchParams.get('category')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [productsCount, setProductsCount] = useState(0)
    const [filtered, setFiltered] = useState(false)
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtersCleared, setFiltersCleared] = useState(false)

    useEffect(() => {
        console.log('Products context')
        setLoading(true)
        //setSearchParams({ page })
        getProducts(page, sort)
            .then(({ products, count, totalPages, currentPage }) => {
                setProducts(products)
                setUnfilteredProducts(products)
                setProductsCount(count)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });
    }, [search, page])

    const prevBtnClasses = page === 1 ? 'page-item disabled' : 'page-item'
    const nextBtnClasses = totalPages === currentPage ? 'page-item disabled' : 'page-item'

    const handleSearch = async (search) => {
        setSearch(search)
        setFiltered(true)
        setLoading(true)

        getProducts(page)
            .then(({ products, count, totalPages, currentPage }) => {
                setProducts(products)
                setProductsCount(count)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }

    const handleSortBy = async (sort) => {
        console.log('sorting')
        setSort(sort)

        getProducts(page, sort)
            .then(({ products, count, totalPages, currentPage }) => {
                setProducts(products)
                setProductsCount(count)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }

    // const clearFilters = (category) => {
    //     setSearch('')
    //     setFiltered(false)
    //     setFilters()

    //     const inputs = document.querySelectorAll('input');

    //     inputs.forEach(input => {
    //         if (input.type === 'checkbox') {
    //             input.checked = false;
    //         }

    //         if (input.type === 'text') input.value = ''
    //     });

    //     document.getElementById('sort').value = ''

    //     getProducts(category)
    //         .then(data => setProducts(data))
    //         .catch(err => console.error(err));
    // }

    return (
        <ProductsContext.Provider value={{
            products,
            setProducts,
            search,
            setSearch,
            filtered,
            setFiltered,
            loading,
            setLoading,
            handleSearch,
            filtersCleared,
            setFiltersCleared,
            filters,
            setFilters,
            handleSortBy,
            prevBtnClasses,
            nextBtnClasses,
            productsCount,
            page,
            setPage
        }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;