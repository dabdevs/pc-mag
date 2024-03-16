import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { GROUPED_COLUMNS } from '../computer/columns'
import GlobalFilter from '../GlobalFilter'
import { getComputers } from '../../api/computers'
import { useSearchParams } from 'react-router-dom'

export default function ComputersTable() {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('')
    const [pageInput, setPageInput] = useState('')
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(0);
    const [limit, setLimit] = useState('');
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setLoading(true)
        getComputers(currentPage, '', limit)
            .then(({ computers, totalPages, currentPage, rowsCount }) => {
                if(search) setSearchParams({ search })
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
    }, [currentPage, limit, search, searchParams])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: 0,
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect)

    return (
        <div className='card'>
            <div className='card-header'>
                <label htmlFor='filter'>Filter by column</label>
                <input id='filter' defaultValue={''} onChange={(e) => setSearch(e.target.value)} className='form-control search-input w-100' placeholder='Ex.: Apple' />
            </div>

            <div className='card-body p-0'>
                {loading && <b>Loading...</b>}

                {!loading &&
                    <>
                        <div className='mt-2 px-2 d-flex flex-column'>
                            <b>{search}</b> 
                            <span>{results} items</span>
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
                    </>
                }
            </div>

            <div className='card-footer d-flex gap-1'>
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

                <div style={{ width: '400px' }}>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage => currentPage - 1) }} disabled={currentPage <= 1}>Previous</button>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
                    <button className="btn btn-sm btn-outline-dark" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage => currentPage + 1) }} disabled={currentPage >= totalPages}>Next</button>
                </div>
            </div>

            {/* <GlobalFilter setSearch={setSearch} filter={globalFilter} setFilter={setGlobalFilter} /> */}

        </div>
    )
}
