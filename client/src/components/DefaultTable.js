import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import computers from './computers.json'
import GlobalFilter from './GlobalFilter'
import { Checkbox } from './Checkbox'

export default function DefaultTable() {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => computers, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        selectedFlatRows,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks) => {
        hooks.visibleColumns.push(columns => {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
    })

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

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
                    {page.map(row => {
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
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    {' '}
                </div>

                <div className='d-flex'>
                    Go to page: {' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        className='form-control form-control-sm mx-2'
                        style={{ width: '50px' }}
                    />

                    Show: {'  '}
                    <select
                        className='form-control form-control-sm'
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
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
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button className='btn btn-sm btn-outline-dark me-1' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button className='btn btn-sm btn-outline-dark' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </div>
            </div>
        </div>
    )
}
