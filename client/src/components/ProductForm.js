import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProductForm({product}) {
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

    console.log(product)
    return (
        <Form>
            <input type='hidden' value={form?._id} name='_id' />
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name='name'
                    value={form?.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
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
                            name='formFactor'
                            value={form?.formFactor}
                            onChange={(e) => setForm({ ...form, formFactor: e.target.value })}
                        >
                            <option>Notebook</option>
                            <option>Desktop</option>
                            <option>All-In-One</option>
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
                            onChange={(e) => setForm({ ...form, os: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Label>Ram</Form.Label>
                    <Form.Select
                        name='ram'
                        value={form?.ram}
                        onChange={(e) => setForm({ ...form, ram: e.target.value })}
                    >
                        <option>4 GB</option>
                        <option>8 GB</option>
                        <option>16 GB</option>
                        <option>32 GB</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Type</Form.Label>
                        <Form.Select
                            name='diskType'
                            value={form?.diskType}
                            onChange={(e) => setForm({ ...form, diskType: e.target.value })}
                        >
                            <option>SSD</option>
                            <option>HDD</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Disk Capacity</Form.Label>
                        <Form.Select
                            name='disk'
                            value={form?.disk}
                            onChange={(e) => setForm({ ...form, disk: e.target.value })}
                        >
                            <option>4 GB</option>
                            <option>HDD</option>
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
                        <Form.Label>Price </Form.Label>
                        <Form.Control
                            name='price'
                            value={(form.price / 100).toFixed(2)}
                            type='number'
                            min={0}
                            placeholder='ex: 1599.99'
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>

            
        </Form>
    )
}
