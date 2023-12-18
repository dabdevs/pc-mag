import React, { useEffect, useRef, useState } from 'react'
import Dashboard from '../views/Dashboard'
import TableComponent from '../components/Shared/TableComponent'
import { getProducts, create, update, destroy } from '../api/products'
import ModalComponent from '../components/Shared/ModalComponent'
import ProductForm from '../Forms/ProductForm'
import { formatPrice } from '../utils'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import { FaPlus } from "react-icons/fa";

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

    const createItem = (product) => {
        setAction('create')
        setModalTitle('New Product')
        setOpenModal(true)
        setSelectedProduct(product)
    }

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

    const confirmCreate = () => {
        console.log('Creating product')
        const data = new FormData(document.getElementById('productForm'))
        create(data).then(product => {
            setOpenModal(false)
            setProducts([...products, product]);
            alert('Product created successfully')
        }).catch(err => console.log(err))
    } 

    const confirmEdit = () => {
        const data = new FormData(document.getElementById('productForm'))
        update(data).then(updatedProduct => {
            setSelectedProduct(updatedProduct)
            setOpenModal(false)
            setProducts((prevProducts) => {
                return prevProducts.map((prod) =>
                    prod._id === updatedProduct._id ? updatedProduct : prod
                );
            });
            alert('Product updated successfully')
        }).catch(err => console.log(err))
    }

    const confirmDelete = () => {
        destroy(selectedProduct._id).then(({_id}) => {
            setOpenModal(false)
            setProducts((prevProducts) => {
                return prevProducts.filter((prod) =>
                    prod._id !== _id 
                );
            });
            alert('Product deleted successfully')
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

    let confirmFunction;

    switch (action) {
        case 'create':
            confirmFunction = confirmCreate
            break;
        case 'edit':
            confirmFunction = confirmEdit
            break;
        case 'delete':
            confirmFunction = confirmDelete
            break;
        default:
            break;
    }

    return products.length ? (
        <Dashboard>
            <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <Row>
                    <Col xs={9}>
                        <h1 className="display-3 fw-bolder">Products</h1>
                    </Col>
                    <Col xs={3} className='d-flex align-items-center'>
                        <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Product</button>
                    </Col>
                </Row>

                <TableComponent data={tableData} />

                {openModal && <ModalComponent action={action} title={modalTitle} handleConfirm={confirmFunction} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm product={selectedProduct} />}
                </ModalComponent>}
            </section>
        </Dashboard>
    ) : null
}

