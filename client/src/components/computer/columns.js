import { format } from 'date-fns'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: '_id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Brand',
        Footer: 'Brand',
        accessor: 'brand'
    },
    {
        Header: 'Form Factor',
        Footer: 'Form Factor',
        accessor: 'formFactor'
    },
    {
        Header: 'Description',
        Footer: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Category',
        Footer: 'Category',
        accessor: 'category'
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
    },
    {
        Header: 'Available',
        Footer: 'Available',
        accessor: 'quantity'
    },
    {
        Header: 'Price',
        Footer: 'Price',
        accessor: 'price'
    },
    {
        Header: 'Rating',
        Footer: 'Rating',
        accessor: 'rating'
    },
    {
        Header: 'Date Created',
        Footer: 'Date Created',
        accessor: 'dateCreated',
        Cell: ({ value }) => { return format(new Date(value, 'dd/MM/yyyy')) }
    },
    {
        Header: 'Date Published',
        Footer: 'Date Published',
        accessor: 'datePublished'
    },
    {
        Header: 'Status',
        Footer: 'Status',
        accessor: 'status'
    },
    {
        Header: 'Action',
        Footer: 'Action',
        Cell: (props) => (
            <button className='btn btn-sm btn-primary' onClick={console.log(props)}>
                Edit
            </button>
        )
    }
]

export const GROUPED_COLUMNS = [
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
                accessor: 'price'
            },
            {
                Header: 'Rating',
                Footer: 'Rating',
                accessor: 'rating'
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
                    <EditButton id={row.original.id} />
                    <DeleteButton id={row.original.id} />
                </div>
            }
        ]
    }
]