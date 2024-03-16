import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { GROUPED_COLUMNS } from '../computer/columns'
import GlobalFilter from '../GlobalFilter'
import { getComputers } from '../../api/computers'
import { FaTabletButton } from 'react-icons/fa6'
import { useComputersContext } from '../../context/ComputersContext'
import { useSearchParams } from 'react-router-dom'

export default function ComputersTable() {
    // console.log('default table', computers)
    // // const data = useMemo(() => computers, [])
    // const { computers, page, setPage } = useComputersContext()

    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageInput, setPageInput] = useState(null)
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(0);
    const [limit, setLimit] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setLoading(true)
        //setSearchParams({ page })

        getComputers(currentPage, '', limit)
            .then(({ computers, totalPages, currentPage, rowsCount }) => {
                setData(computers)
                setLoading(false)
                setTotalPages(totalPages)
                setCurrentPage(Number(currentPage))
                setResults(rowsCount)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [currentPage, limit])

    console.log('data in table', data)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        setPageSize,
        prepareRow,
        selectedFlatRows,
        state: { globalFilter, pageIndex, pageSize },
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: 0,
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect)

    function changePage(page) {
        console.log('changing page')
        setSearchParams({ page })
    }

    // useEffect(() => { 
    //     setData(computers);
    //     setCurrentPage(page)
    //     setLoading(false);
    //     console.log('Table reloaded', currentPage)
    // }, [data, currentPage]);

    console.log('pages===>', totalPages, currentPage)

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <div className='mt-3'>
                <b></b> {results} items
            </div>

            <table {...getTableProps()} className='w-100 table table-striped border'>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr className='border' {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th className='border text-center' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' ⟰' : ' ⟱') : ''}
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr className='border' {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td className='border' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>

                {/* <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr className='border' {...footerGroup.getFooterGroupProps}>
                                {
                                    footerGroup.headers.map(column => (
                                        <td className='border' {...column.getFooterProps()}>
                                            {
                                                column.render('Footer')
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot> */}
            </table>

            <div className='d-flex gap-1'>
                <div>
                    Page{' '}
                    <strong>
                        {currentPage} of {totalPages}
                    </strong>
                    {' '}
                </div>

                <div className='d-flex mx-3'>
                    {/* Go to page: {' '}
                    <input
                        type='number'
                        defaultValue={''}
                        onChange={e => {
                            const pageNumber = Number(e.target.value)
                            if (pageNumber === 0 || pageNumber > totalPages) {
                                setPageInput(currentPage)
                                return
                            }

                            setCurrentPage(pageNumber)
                        }}
                        className='form-control form-control-sm mx-2'
                        style={{ width: '80px' }}
                    /> */}

                    Show: {'  '}
                    <select
                        className='form-control form-control-sm'
                        value={limit}
                        onChange={e => setLimit(Number(e.target.value))}
                        style={{ width: '50px' }}
                    >
                        {
                            [10, 25, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* <nav className='row px-2'>
                    <ul className="pagination pagination-sm mt-3">
                        <li className={prevBtnClasses}>
                            <Link className="page-link text-dark" href='#' tabIndex="-1" onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage - 1) }}>Previous</Link>
                        </li>
                        <li className="page-item" aria-current="page" onClick={(e) => { e.preventDefault(); setPage(1) }}>
                            <Link className={`page-link ${page === 1 ? 'text-danger' : 'text-dark'}`} href='#'>1</Link>
                        </li>
                        <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(2) }}>
                            <Link className={`page-link ${page === 2 ? 'text-danger' : 'text-dark'}`} href='#'>2</Link>
                        </li>
                        <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(3) }}>
                            <Link className={`page-link ${page === 3 ? 'text-danger' : 'text-dark'}`} href='#'>3</Link>
                        </li>
                        <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(4) }}>
                            <Link className={`page-link ${page === 4 ? 'text-danger' : 'text-dark'}`} href='#'>4</Link>
                        </li>
                        <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(5) }}>
                            <Link className={`page-link ${page === 5 ? 'text-danger' : 'text-dark'}`} href='#'>5</Link>
                        </li>
                        <li className={`page-item disabled`} aria-current="page">
                            <Link className="page-link text-dark" href='#'>... {page === currentPage}</Link>
                        </li>

                        {page > 5 &&
                            <li className={`page-item`} aria-current="page">
                                <Link className="page-link text-danger" href='#'>{page}</Link>
                            </li>
                        }

                        <li className={nextBtnClasses}>
                            <Link className="page-link text-dark" href='#' onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage + 1) }}>Next</Link>
                        </li>
                    </ul>
                </nav> */}

                <div style={{ width: '400px' }}>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</button>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage => currentPage - 1) }} disabled={currentPage <= 1}>Previous</button>
                    <button className='btn btn-sm btn-outline-dark' onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
                    <button className="btn btn-sm btn-outline-dark" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage => currentPage + 1) }} disabled={currentPage >= totalPages}>Next</button>
                </div>
            </div>
        </div>
    )
}
