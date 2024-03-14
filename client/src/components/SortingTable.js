import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import computers from './computers.json'

export default function SortingTable() {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => computers, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    }, useSortBy)

    return (
        <table {...getTableProps()} className='w-100 table table-striped border'>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr className='border' {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th className='border' {...column.getHeaderProps(column.getSortByToggleProps())}>
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

            <tfoot>
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
            </tfoot>
        </table>
    )
}
