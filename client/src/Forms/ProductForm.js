import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProductForm({ product }) {
    const initialState = {
        _id: '',
        name: '',
        formFactor: '',
        os: '',
        processor: '',
        ram: '',
        disk: '',
        diskType: '',
        price: '',
        quantity: ''
    }

    const [form, setForm] = useState(product || initialState)

    return (
        <Form id='productForm'>
            <input type='hidden' value={form?._id} name='_id' />
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name='name'
                    value={form?.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    placeholder="ex: Macbook Pro 2022 Retina Display"
                    autoFocus
                />
            </Form.Group>

            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Form Factor </Form.Label>
                        <Form.Select
                            defaultChecked={form?.formFactor}
                            name='formFactor'
                            value={form?.formFactor}
                            onChange={(e) => setForm({ ...form, formFactor: e.target.value })}
                        >
                            <option value='notebook'>Notebook</option>
                            <option value='desktop'>Desktop</option>
                            <option value='all-in-one'>All-In-One</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Operative System</Form.Label>
                        <Form.Control
                            name='os'
                            value={form?.os}
                            type='text'
                            placeholder='ex: Windows 10'
                            onChange={(e) => setForm({ ...form, os: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Label>Ram</Form.Label>
                    <Form.Select
                        name='ram'
                        defaultChecked={form?.ram}
                        value={form?.ram}
                        onChange={(e) => setForm({ ...form, ram: e.target.value })}
                    >
                        <option value={'4GB'}>4 GB</option>
                        <option value={'8GB'}>8 GB</option>
                        <option value={'16GB'}>16 GB</option>
                        <option value={'32GB'}>32 GB</option>                    
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Type</Form.Label>
                        <Form.Select
                            name='diskType'
                            defaultChecked={form?.diskType}
                            value={form?.diskType}
                            onChange={(e) => setForm({ ...form, diskType: e.target.value })}
                        >
                            <option value={'SSD'}>SSD</option>
                            <option value={'HDD'}>HDD</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Capacity</Form.Label>
                        <Form.Select
                            name='disk'
                            defaultChecked={form?.disk}
                            value={form?.disk}
                            onChange={(e) => setForm({ ...form, disk: e.target.value })}
                        >
                            <option value={'128GB'}>128 GB</option>
                            <option value={'256GB'}>256 GB</option>
                            <option value={'500GB'}>500 GB</option>
                            <option value={'1TB'}>1 TB</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Processor</Form.Label>
                        <Form.Control
                            name='processor'
                            value={form?.processor}
                            type='text'
                            onChange={(e) => setForm({ ...form, processor: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Display</Form.Label>
                        <Form.Control
                            name='display'
                            value={form.display}
                            type='number'
                            min={10}
                            max={30}
                            placeholder='ex: 22'
                            onChange={(e) => setForm({ ...form, display: e.target.value })}
                        />
                    </Form.Group>
                </Col>

                <Col xs={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Price <small>(In cents)</small> </Form.Label>
                        <Form.Control
                            name='price'
                            value={form.price}
                            type='number'
                            placeholder='ex: 1599.99'
                            onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9]/g, '') })}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Available</Form.Label>
                        <Form.Control
                            name='quantity'
                            value={form.quantity}
                            type='number'
                            placeholder='ex: 1'
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}
