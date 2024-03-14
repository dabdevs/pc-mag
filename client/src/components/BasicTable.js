import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import computers from './computers.json'

export default function BasicTable() {
    const columns = useMemo(() => COLUMNS, [])
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
    })

    return (
        <table {...getTableProps()} className='w-100 table table-striped'>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getFooterGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps}>{column.render('Header')}</th>
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
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>

            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps()}>
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
