import React, { useEffect, useState } from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'
import { getProducts } from '../api/products'

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(products => setProducts(products)).catch(err => console.log(err))
    }, [])

    const tableData = {
        tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
        tBody: products?.map(product =>
            [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${product.price.toFixed(2) / 100}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm'>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>]
        )
    }

    return products.length ? (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <h1 className="display-3 fw-bolder">Products</h1>

                <TableComponent data={tableData} />
            </section>
        </Dashboard>
    ) : null
}

