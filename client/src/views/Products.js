import React from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'

export default function Products() {
    const tableData = {
        tHead: ['Product', 'Description', 'Price', 'Available', 'Actions'],
        tBody: [
            {
                tData: ['Product 1', 'Description 1', '$ 4522.75', 100, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>],
                classes: []
            },
            {
                tData: ['Product 2', 'Description 2', '$ 1549.25', 10, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>],
                classes: []
            },
            {
                tData: ['Product 3', 'Description 3', '$ 2800.50', 230, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>],
                classes: []
            },
            {
                tData: ['Product 4', 'Description 4', '$ 3500.99', 45, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>],
                classes: []
            },
            {
                tData: ['Product 5', 'Description 5', '$ 789.99', 22, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>],
                classes: []
            },
        ]
    }

    return (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ height: '80vh' }}>
                <h1 className="display-3 fw-bolder">Products</h1>

                <TableComponent data={tableData} />
            </section>
        </Dashboard>
    )
}
