import React, { useEffect, useRef, useState } from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'
import { getProducts, create, update, destroy } from '../api/products'
import ModalComponent from '../components/Shared/ModalComponent'
import ProductForm from '../Forms/ProductForm'
import { formatPrice } from '../utils'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlus, FaTimes } from "react-icons/fa";

export default function Products() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [tableData, setTableTada] = useState(undefined)
    const [action, setAction] = useState(null)

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log('PRODUCTS CHANGED', products)
        setTableTada({
            tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
            tBody: products?.map(product =>
                [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${formatPrice(product.price)}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button></div>]
            )
        })
    }, [products])

    const createItem = (product) => {
        setAction('create')
        setSelectedProduct(product)
    }

    const editItem = (product) => {
        setAction('edit')
        setSelectedProduct(product)
    }

    const deleteItem = (product) => {
        setAction('delete')
        setModalTitle(`Deleting "${product.name}"`)
        setOpenModal(true)
        setSelectedProduct(product)
    }



    const deleteProduct = () => {
        destroy(selectedProduct._id).then(({ _id }) => {
            setOpenModal(false)
            setProducts((prevProducts) => {
                return prevProducts.filter((prod) =>
                    prod._id !== _id
                );
            });
            alert('Product deleted successfully')
        }).catch(err => console.log(err))
    }

    return products.length > 0 ? (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <Row>
                    <Col xs={9}>
                        <h1 className="display-3 fw-bolder">Products</h1>
                    </Col>
                    <Col xs={3} className='d-flex align-items-center'>
                        {selectedProduct ? <button className='btn btn-danger ms-auto' onClick={() => setSelectedProduct(null)}><FaTimes /> Cancel</button> : <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Product</button>}
                    </Col>
                </Row>

                {selectedProduct && <ProductForm setProducts={setProducts} product={selectedProduct} />}

                <TableComponent data={tableData} />

                {openModal && <ModalComponent action={action} title={modalTitle} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm product={selectedProduct} />}
                </ModalComponent>}
            </section>
        </Dashboard>
    ) : null
}

