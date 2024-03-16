import { createContext, useState, useEffect, useContext } from "react";
import { getComputers } from "../api/computers";

const ComputersContext = createContext({})

export function useComputersContext() {
    return useContext(ComputersContext);
}

export const ComputersContextProvider = ({ children }) => {
    const [computers, setComputers] = useState([])
    const [sort, setSort] = useState('')
    //const [unfilteredComputers, setUnfilteredComputers] = useState([])
    const [search, setSearch] = useState()
    //const { keyword } = useLocation()
    //const category = searchParams.get('category')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [computersCount, setComputersCount] = useState(0)
    const [filtered, setFiltered] = useState(false)
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtersCleared, setFiltersCleared] = useState(false)

    useEffect(() => {
        console.log('Computers context')
        setLoading(true)
        //setSearchParams({ page })
        getComputers(page, sort)
            .then(({ computers, count, totalPages, currentPage }) => {
                setComputers(computers)
                // setUnfilteredComputers(computers)
                // setComputersCount(count)
                // setTotalPages(totalPages)
                // setCurrentPage(currentPage)
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

        getComputers(page)
            .then(({ computers, count, totalPages, currentPage }) => {
                setComputers(computers)
                setComputersCount(count)
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

        getComputers(page, sort)
            .then(({ computers, count, totalPages, currentPage }) => {
                setComputers(computers)
                setComputersCount(count)
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

    //     getComputers(category)
    //         .then(data => setComputers(data))
    //         .catch(err => console.error(err));
    // }

    return (
        <ComputersContext.Provider value={{
            computers,
            setComputers,
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
            computersCount,
            page,
            setPage
        }}
        >
            {children}
        </ComputersContext.Provider>
    )
}

export default ComputersContext;