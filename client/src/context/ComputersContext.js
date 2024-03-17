import { createContext, useState, useEffect, useContext } from "react";
import { getComputers } from "../api/computers";
import { getKeyboards } from "../api/keyboards";

const ComputersContext = createContext({})

export function useComputersContext() {
    return useContext(ComputersContext);
}

export const ComputersContextProvider = ({ children }) => {
    const [computers, setComputers] = useState([])
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [computersCount, setComputersCount] = useState(0)
    const [filtered, setFiltered] = useState(false)
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtersCleared, setFiltersCleared] = useState(false)

    useEffect(() => {
        setLoading(true)
        switch (category) {
            case 'Computers' || '':
                getComputers(page, sort)
                    .then(({ computers }) => {
                        setComputers(computers)
                        setCategory(window.location.href)
                        setLoading(false)
                    })
                    .catch(err => {
                        console.error(err)
                        setLoading(false)
                    });
                break;

            case 'Keyboards':
                getKeyboards().then(keyboards => console.log('Keyboards:', keyboards))
            default:
                break;
        }

    }, [search, page, filters, category])

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
        console.log('sorting', sort)
        setSort(sort)

        getComputers(page, sort)
            .then(({ computers }) => {
                setComputers(computers)
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
            category,
            setCategory,
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