import React, { useEffect, useRef, useState } from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'
import { getProducts, update, destroy } from '../api/products'
import ModalComponent from '../components/Shared/ModalComponent'
import ProductForm from '../Forms/ProductForm'
import { formatPrice } from '../utils'

export default function Products() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [tableData, setTableTada] = useState(undefined)
    const [action, setAction] = useState('create')

    useEffect(() => {
        getProducts().then(products => setProducts(products)).catch(err => console.log(err))
    }, [])

    const editItem = (product) => {
        setAction('edit')
        setModalTitle(product.name)
        setOpenModal(true)
        setSelectedProduct(product)
    }

    const deleteItem = (product) => {
        setAction('delete')
        setModalTitle(`Deleting "${product.name}"`)
        setOpenModal(true)
        setSelectedProduct(product)
    }

    const handleEdit = () => {
        const data = new FormData(document.getElementById('productForm'))
        update(data).then(updatedProduct => {
            setSelectedProduct(updatedProduct)
            setOpenModal(false)
            setProducts((prevProducts) => {
                return prevProducts.map((prod) =>
                    prod._id === updatedProduct._id ? updatedProduct : prod
                );
            });
        }).then(() => alert('Product updated successfully')).catch(err => console.log(err))
    }

    const handleDelete = (product) => {
        console.log('deleting', product.name)
        destroy(product._id).then(({_id}) => {
            setOpenModal(false)
            setProducts((prevProducts) => {
                return prevProducts.filter((prod) =>
                    prod._id !== _id 
                );
            });
        }).catch(err => console.log(err))
    } 

    useEffect(() => {
        setTableTada({
            tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
            tBody: products?.map(product =>
                [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${formatPrice(product.price)}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button></div>]
            )
        })
    }, [products])

    console.log(action)
    return products.length ? (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <h1 className="display-3 fw-bolder">Products</h1>

                <TableComponent data={tableData} />

                {openModal && <ModalComponent action={action} title={modalTitle} handleConfirm={action == 'delete' ? () => handleDelete(selectedProduct) : handleEdit} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm product={selectedProduct} />}
                </ModalComponent>}
            </section>
        </Dashboard>
    ) : null
}

