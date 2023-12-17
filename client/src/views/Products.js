import React, { useEffect, useState } from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'
import { getProducts } from '../api/products'
import ModalComponent from '../components/Shared/ModalComponent'
import ProductForm from '../components/ProductForm'

export default function Products() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        getProducts().then(products => setProducts(products)).catch(err => console.log(err))
    }, [])

    const editItem = (product) => {
        setOpenModal(true)
        setSelectedProduct(product)
    }

    const handleConfirm = () => {
        console.log('Confirming modal')
    }

    const tableData = {
        tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
        tBody: products?.map(product =>
            [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${product.price.toFixed(2) / 100}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm'>Delete</button></div>]
        )
    }

    return products.length ? (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <h1 className="display-3 fw-bolder">Products</h1>

                <TableComponent data={tableData} />

                {openModal && <ModalComponent handleConfirm={handleConfirm} setOpenModal={setOpenModal}>
                    <ProductForm product={selectedProduct} />
                </ModalComponent>}
            </section>
        </Dashboard>
    ) : null
}

