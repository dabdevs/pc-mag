import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { create, update, deleteImage } from '../api/computers';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ImageUploader from '../components/ImageUploader';
import * as yup from "yup"

const schema = yup
    .object({
        title: yup.string().required().min(10).max(150),
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

export default function ComputerForm({ computer, setComputers, closeForm, data}) {
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
        review: '',
        createdBy: '',
        images: []
    }

    
    const [form, setForm] = useState(computer || initialState)
    const [alert, setAlert] = useState({})
    const [images, setImages] = useState(form.images)
    const loadedForm = form
    
    console.log('form changed', form)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })

    const handleCreate = () => {
        console.log('Form', form)
        create(form).then(({ computer }) => {
            setForm(computer)
            setComputers(prevComputers => {
                return [computer, ...prevComputers]
            });
            setAlert({ message: 'Computer created successfully', class: 'success' })
        }).catch(error => {
            if (error && error?.response.status === 422) {
                setAlert({ message: error?.response.data.error.errors[0], class: 'danger' })
            }
        })
    }

    const handleEdit = (computer) => {
        if (loadedForm !== form) {
            console.log('form edited')
        } else {
            console.log('form not edited')
        }
        computer._id = form._id
        update(computer).then(({ computer }) => {
            setComputers(prevComputers => {
                return prevComputers.map(prod => prod._id === computer._id ? computer : prod);
            });
            setForm(computer)
            setAlert({ message: 'Computer updated successfully', class: 'success' })
        }).catch(error => {
            if (error?.response.status === 422) {
                setAlert({ message: error.response.data.error.errors[0], class: 'danger' })
            }
        })
    }

    const removeImage = async (computerId, url) => {
        // if (confirm('Are you sure you want to delete this image?')) {

        // }

        deleteImage(computerId, url).then(({ computer }) => {
            console.log('Updated images', data.computer)
            setImages(computer.images)
            setComputers(prevComputers => {
                return prevComputers.map(prod => {
                    if (prod._id === computer._id) {
                        console.log('updated images', computer.images)
                        prod.images = computer.images
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

    return (
        <div>
            <Row>
                <h1 className='display-4 fw-bolder'>{form._id ? form.name : 'New Computer'}</h1>
            </Row>
            {/* {form?._id && <input type='hidden' value={form?._id} name='_id' />} */}
            <Row>
                <Col xs={12}>
                    {alert?.message && <div className={`alert alert-${alert.class}`}>{alert.message}</div>}
                </Col>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name='name'
                        value={form?.name ? form.name : ''}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        type="text"
                        placeholder="ex: Macbook Pro 2022 Retina Display"
                        autoFocus
                    />
                    <small className='text-danger'>{errors?.name?.message}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='form-control'
                        id='description'
                        name='description'
                        value={form?.description ? form.description : ''}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        placeholder="ex: The Macbook Pro 2022 Retina Display is the one of the best computers you can buy..."
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
                        <option value={'512MB'}>512MB</option>
                        <option value={'1GB'}>1GB</option>
                        <option value={'2GB'}>2GB</option>
                        <option value={'4GB'}>4GB</option>
                        <option value={'8GB'}>8GB</option>
                        <option value={'16GB'}>16GB</option>
                        <option value={'32GB'}>32GB</option>
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
                            <option value={'128GB'}>128GB</option>
                            <option value={'256GB'}>256GB</option>
                            <option value={'500GB'}>500GB</option>
                            <option value={'1TB'}>1TB</option>
                            <option value={'2TB'}>2TB</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.disk?.message}</small>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={3}>
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
                            value={form?.display ? form.display : ''}
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
                        <Form.Label>Price <small>(in scents)</small> </Form.Label>
                        <Form.Control
                            name='price'
                            value={form?.price ? form.price : ''}
                            type='number'
                            placeholder='ex: 1599.99'
                            {...register("price")}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                        <small className='text-danger'>{errors.price?.message}</small>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            name='quantity'
                            value={form?.quantity ? form.quantity : ''}
                            type='number'
                            placeholder='ex: 10'
                            {...register("quantity")}
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        />
                        <small className='text-danger'>{errors.quantity?.message}</small>
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

            {form._id && computer ? images.length < data.imagesPerComputer && <Row>
                <>
                    <Col xs={10}><h4>Upload up to {data.imagesPerComputer} images</h4></Col>
                    <Col xs={6}>
                        <ImageUploader imagesCount={images.length} collection='computers' id={form._id} setImages={setImages} setAlert={setAlert} setComputers={setComputers} />
                    </Col>
                </>
            </Row> : null}

            <Row className='my-2 border-bottom py-2'>
                <Col xs={4} className='d-flex gap-2 border-0'>
                    <Button onClick={() => { setForm(initialState); closeForm(); }} type='button' variant="danger">
                        Close
                    </Button>
                    <Button onClick={(e) => { form?._id ? handleSubmit(handleEdit(form)) : handleSubmit(handleCreate())}} type='button' variant="primary">
                        Save Changes
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
