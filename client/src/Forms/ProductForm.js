import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { create, update, deleteImage } from '../api/products';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ImageUploader from '../components/ImageUploader';
import * as yup from "yup"

const schema = yup
    .object({
        name: yup.string().required("Name is required").min(10).max(150),
        description: yup.string().optional(),
        price: yup.number().integer().required(),
        images: yup.array(),
        formFactor: yup.string().required(),
        brand: yup.string().required(),
        category: yup.string().required(),
        os: yup.string().required(),
        ram: yup.string().required(),
        processor: yup.string().required(),
        display: yup.number().integer().required(),
        quantity: yup.number().integer().required(),
        diskType: yup.string().required(),
        disk: yup.string().required(),
    })
    .required()

export default function ProductForm({ product, setProducts, closeForm, data }) {
    const initialState = {
        _id: '',
        name: '',
        description: '',
        formFactor: '',
        brand: '',
        category: '',
        os: '',
        processor: '',
        ram: '',
        disk: '',
        diskType: '',
        price: '',
        display: '',
        quantity: '',
        images: []
    }

    const [form, setForm] = useState(product || initialState)
    const [alert, setAlert] = useState({})
    const [images, setImages] = useState(form.images)
    const loadedForm = form
  
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })

    const handleCreate = (product) => {
        console.log('Creating', product)
        create(product).then(({ product }) => {
            console.log('product created')
            setForm(product)
            setProducts(prevProducts => {
                return [product, ...prevProducts]
            });
            setAlert({ message: 'Product created successfully', class: 'success' })
        }).catch(err => {
            if (err.response) {
                setAlert({ message: err.response.data.message, class: 'danger' })
            }
        })
    }

    const handleEdit = (product) => {
        console.log('Editing')

        if (loadedForm !== form) {
            console.log('form edited')
        } else {
            console.log('form not edited')
        }
        product._id = form._id
        update(product).then(({ product }) => {
            setProducts(prevProducts => {
                return prevProducts.map(prod => prod._id === product._id ? product : prod);
            });
            setForm(product)
            setAlert({ message: 'Product updated successfully', class: 'success' })
        }).catch(err => {
            setAlert({ message: 'An error ocurred', class: 'danger' })
        })
    }

    const removeImage = async (productId, url) => {
        if (confirm('Are you sure you want to delete this image?')) {
            deleteImage(productId, url).then(({ product }) => {
                console.log('Updated images', data.product)
                setImages(product.images)
                setProducts(prevProducts => {
                    return prevProducts.map(prod => {
                        if (prod._id === product._id) {
                            console.log('updated images', product.images)
                            prod.images = product.images
                        }
                        return prod
                    });
                });
            })
            .then(() => setAlert({ class: 'success', message: 'Image deleted successfully' }))
            .catch(({ response }) => {
                console.log(response.data.message)
                setAlert({ class: 'danger', message: response.data.message })
            })
        }
    }

    return (
        <div>
            <Row>
                <h1 className='display-4 fw-bolder'>{form._id ? form.name : 'New Product'}</h1>
            </Row>
            {form?._id && <input type='hidden' value={form?._id} name='_id' />}
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name='name'
                        defaultValue={form?.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        type="text"
                        placeholder="ex: Macbook Pro 2022 Retina Display"
                        autoFocus
                        {...register("name")}
                    />
                    <small className='text-danger'>{errors?.name?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='form-control'
                        id='description'
                        name='description'
                        defaultValue={form?.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}

                        rows={3}
                        placeholder="ex: The Macbook Pro 2022 Retina Display is the one of the best computers you can buy..."
                        {...register("description")}
                    />
                    <small className='text-danger'>{errors.description?.message}</small>
                </Form.Group>
            </Row>

            <Row>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Select
                            defaultChecked={form?.brand}
                            name='brand'
                            value={form?.brand}
                            {...register("brand")}
                            onChange={(e) => setForm({ ...form, brand: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            {data?.brands?.map((brand, i) => <option key={i} value={brand.name}>{brand.name}</option>)}
                        </Form.Select>
                        <small className='text-danger'>{errors.brand?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Form Factor</Form.Label>
                        <Form.Select
                            defaultChecked={form?.formFactor}
                            name='formFactor'
                            value={form?.formFactor}
                            {...register("formFactor")}
                            onChange={(e) => setForm({ ...form, formFactor: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            <option value='Laptop'>Laptop</option>
                            <option value='Desktop'>Desktop</option>
                            <option value='All-In-One'>All-In-One</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.formFactor?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Operative System</Form.Label>
                        <Form.Select
                            defaultChecked={form?.os}
                            name='os'
                            value={form?.os}
                            type='text'
                            placeholder='ex: Windows 10'
                            {...register("os")}
                            onChange={(e) => setForm({ ...form, os: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            {data?.operativeSystems?.map((os, i) => <option key={i} value={os.name}>{os.name}</option>)}
                        </Form.Select>
                        <small className='text-danger'>{errors.os?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Label>Ram</Form.Label>
                    <Form.Select
                        name='ram'
                        defaultChecked={form?.ram}
                        value={form?.ram}
                        {...register("ram")}
                        onChange={(e) => setForm({ ...form, ram: e.target.value })}
                    >
                        <option value=''>Select an option</option>
                        <option value={'4 GB'}>4 GB</option>
                        <option value={'8 GB'}>8 GB</option>
                        <option value={'16 GB'}>16 GB</option>
                        <option value={'32 GB'}>32 GB</option>
                    </Form.Select>
                    <small className='text-danger'>{errors.ram?.message}</small>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Type</Form.Label>
                        <Form.Select
                            name='diskType'
                            defaultChecked={form?.diskType}
                            value={form?.diskType}
                            {...register("diskType")}
                            onChange={(e) => setForm({ ...form, diskType: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            <option value={'SSD'}>SSD</option>
                            <option value={'HDD'}>HDD</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.diskType?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Capacity</Form.Label>
                        <Form.Select
                            name='disk'
                            defaultChecked={form?.disk}
                            value={form?.disk}
                            {...register("disk")}
                            onChange={(e) => setForm({ ...form, disk: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            <option value={'128 GB'}>128 GB</option>
                            <option value={'256 GB'}>256 GB</option>
                            <option value={'500 GB'}>500 GB</option>
                            <option value={'1 TB'}>1 TB</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.disk?.message}</small>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Processor</Form.Label>
                        <Form.Select
                            name='processor'
                            value={form?.processor}
                            type='text'
                            {...register("processor")}
                            onChange={(e) => setForm({ ...form, processor: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            {data?.processors?.map((processor, i) => <option key={i} value={processor.name}>{processor.name}</option>)}
                        </Form.Select>
                        <small className='text-danger'>{errors.processor?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Display</Form.Label>
                        <Form.Control
                            name='display'
                            value={form?.display}
                            type='number'
                            min={10}
                            max={30}
                            {...register("display")}
                            placeholder='ex: 22'
                            onChange={(e) => setForm({ ...form, display: e.target.value })}
                        />
                        <small className='text-danger'>{errors.display?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Price <small>(In cents)</small> </Form.Label>
                        <Form.Control
                            name='price'
                            value={form?.price}
                            type='number'
                            placeholder='ex: 1599.99'
                            {...register("price")}
                            onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9]/g, '') })}
                        />
                        <small className='text-danger'>{errors.price?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Available</Form.Label>
                        <Form.Control
                            name='quantity'
                            value={form?.quantity}
                            type='number'
                            placeholder='ex: 10'
                            {...register("quantity")}
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        />
                        <small className='text-danger'>{errors.quantity?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name='category'
                            value={form?.category}
                            type='text'
                            {...register("category")}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value=''>Select an option</option>
                            {data?.categories?.map((category, i) => <option key={i} value={category.name}>{category.name}</option>)}
                        </Form.Select>
                        <small className='text-danger'>{errors.category?.message}</small>
                    </Form.Group>
                </Col>
            </Row>

            {images ? <Row>
                {images.map(url => (
                    <Col key={url} xs={4} className='p-3 d-flex gap-2'>
                        <img width={300} src={url} alt='' />
                        <button type='button' className='btn btn-sm btn-danger' onClick={() => removeImage(form._id, url)}>X</button>
                    </Col>
                ))}
            </Row> : null}

            {alert?.message && <div className={`alert alert-${alert.class}`}>{alert.message}</div>}

            {form._id && product ? images.length < data.imagesPerProduct && <Row>
                <>
                    <Col xs={10}><h4>Upload up to {data.imagesPerProduct} images</h4></Col>
                    <Col xs={6}>
                        <ImageUploader imagesCount={images.length} collection='products' id={form._id} setImages={setImages} setAlert={setAlert} setProducts={setProducts} />
                    </Col>
                </>
            </Row> : null}

            <Row className='my-2 border-bottom py-2'>
                <Col xs={4} className='d-flex gap-2 border-0'>
                    <Button onClick={() => { setForm(initialState); closeForm(); }} type='button' variant="danger">
                        Close
                    </Button>
                    <Button onClick={product?._id ? handleSubmit(handleEdit) : handleSubmit(handleCreate)} type='button' variant="primary">
                        Save Changes
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
