import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { getComputers } from '../../api/computers'
import { useSearchParams } from 'react-router-dom'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlus } from "react-icons/fa";
import Filter from './Filter'
import ComputerCard from './ComputerCard'
import LazyLoad from 'react-lazyload'
import { useComputersContext } from '../../context/ComputersContext'

export default function ComputersTable({ setSelectedComputer, createItem, display }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('')
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(0);
    const [limit, setLimit] = useState('');
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')
    // const { computers, totalPages, setTotalPages, rowsCount } = useComputersContext()
    const columns = useMemo(() => [
        {
            Header: 'Brand',
            Footer: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Specs',
            Footer: 'Specs',
            columns: [
                {
                    Header: 'Form Factor',
                    Footer: 'Form Factor',
                    accessor: 'formFactor'
                },
                {
                    Header: 'OS',
                    Footer: 'OS',
                    accessor: 'os'
                },
                {
                    Header: 'Processor',
                    Footer: 'Processor',
                    accessor: 'processor'
                },
                {
                    Header: 'Ram',
                    Footer: 'Ram',
                    accessor: 'ram'
                },
                {
                    Header: 'Disk Type',
                    Footer: 'Disk Type',
                    accessor: 'diskType'
                },
                {
                    Header: 'Disk Capacity',
                    Footer: 'Disk Capacity',
                    accessor: 'disk'
                },
                {
                    Header: 'Display',
                    Footer: 'Display',
                    accessor: 'display'
                }
            ]
        },
        {
            Header: 'Info',
            Footer: 'Info',
            columns: [
                {
                    Header: 'Available',
                    Footer: 'Available',
                    accessor: 'quantity'
                },
                {
                    Header: 'Price',
                    Footer: 'Price',
                    accessor: 'price',
                    Cell: ({ row }) => `$${(row.original.price / 100).toFixed(2)}`
                },
                {
                    Header: 'Status',
                    Footer: 'Status',
                    accessor: 'status'
                },
                {
                    Header: 'Action',
                    Footer: 'Action',
                    Cell: ({ row }) => <div onClick={(event) => event.stopPropagation()} className='d-flex'>
                        <EditButton computer={row.original} setSelectedComputer={setSelectedComputer} />
                        <DeleteButton computer={row.original} setData={setData} setResults={setResults} />
                    </div>
                }
            ]
        }
    ], [])

    useEffect(() => {
        setLoading(true)
        console.log('reload table')
        getComputers(currentPage, sort, limit)
            .then(({ computers, totalPages, rowsCount }) => {
                setData(computers)
                setLoading(false)
                setTotalPages(totalPages)
                setResults(rowsCount)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [sort, window.location.href])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: 0,
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect)

    function nextPage(e) {
        e.preventDefault();
        const newPage = currentPage + 1
        setCurrentPage(newPage)
        setSearchParams({ page: newPage })
    }

    function previousPage(e) {
        e.preventDefault();
        const newPage = currentPage - 1
        setCurrentPage(newPage)
        setSearchParams({ page: newPage })
    }

    function firstPage(e) {
        e.preventDefault();
        setCurrentPage(1)
        setSearchParams({ page: 1 })
    }

    function lastPage(e) {
        e.preventDefault();
        setCurrentPage(totalPages)
        setSearchParams({ page: totalPages })
    }
    console.log('Component reloaded')
    return (
        <>
            {display === 'table' && <Row>
                <Col xs={9}>
                    <h1 className="display-4 fw-bolder">Computers</h1>
                </Col>
                <Col xs={3} className='d-flex align-items-center'>
                    <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Computer</button>
                </Col>
            </Row>}
            <div className={`${display === 'table' ? 'card' : ''}`}>
                {display === 'table' && <div className='card-header'>
                    <Filter source='admin' />
                </div>}

                <div className={`card-body p-0 ${display === 'cards' ? 'border-0' : ''}`}>
                    {
                        loading ? <b>Loading...</b> :

                            results > 0 ?
                                <div>
                                    <Row className='pb-2'>
                                        <Col xs={8} sm={10} className='mt-2 d-flex flex-column'>
                                            <b>{search}</b>
                                            <span>{results} items</span>
                                        </Col>
                                        <Col xs={4} sm={2} className='mt-2 d-flex'>
                                            <select id='sort' className='form-control ml-1 text-center' onChange={(e) => setSort(e.target.value)}>
                                                <option value={''}>Sort By</option>
                                                <option value={''}>best match</option>
                                                <option value={'lowest-price'}>lowest price</option>
                                                <option value={'highest-price'}>highest price</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    {
                                        display === 'table' ?
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
                                            </table> :
                                            <Row className='gx-1 gx-lg-4 row-cols-sm-2 row-cols-lg-4 pb-4'>
                                                {data?.map(computer =>
                                                    <LazyLoad key={`ll-${computer._id}`} offset={100}>
                                                        <ComputerCard key={`pc-${computer._id}`} id={computer._id} computer={computer} />
                                                    </LazyLoad>
                                                )}
                                            </Row>
                                    }

                                </div> :
                                <div className='text-center p-5 h6'>
                                    <p className='display-6'>{search}</p>
                                    No results
                                </div>
                    }
                </div>

                {
                    !loading && results > 0 ?
                        <Row className='card-footer'>
                            <div xs={12} className='mt-1'>
                                <div className='d-flex gap-3'>
                                    <div>
                                        Page{' '}
                                        <strong>
                                            {currentPage} of {totalPages}
                                        </strong>
                                        {' '}
                                    </div>

                                    <div className='d-flex gap-2'>
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
                                </div>
                            </div>

                            <div xs={12} className='d-flex mt-1'>
                                <button className='btn btn-sm btn-outline-dark me-1' onClick={previousPage} disabled={currentPage <= 1}>Previous</button>
                                <button className='btn btn-sm btn-outline-dark me-1' onClick={firstPage} disabled={currentPage === 1}>First</button>
                                <button className='btn btn-sm btn-outline-dark me-1' onClick={lastPage} disabled={currentPage >= totalPages}>Last</button>
                                <button className="btn btn-sm btn-outline-dark" onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
                            </div>
                        </Row> : null
                }
            </div>
        </>
    )
}