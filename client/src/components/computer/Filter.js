import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { useComputersContext } from '../../context/ComputersContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Filter({ source, currentPage }) {
    const { setFiltered, filtered, setFilters } = useComputersContext()
    const [search, setSearch] = useState('')
    const [formFactor, setFormFactor] = useState([]);
    const [ram, setRam] = useState([]);
    const [os, setOs] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [diskType, setDiskType] = useState([]);
    const [disk, setDisk] = useState([]);
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const disabled = formFactor.length === 0 && 
                    ram.length === 0 && 
                    processor.length === 0 && 
                    maxPrice === '' && 
                    minPrice === '' && 
                    search === '' && 
                    diskType.length === 0 && 
                    disk.length === 0 &&
                    os.length === 0

    useEffect(() => {
        if (!filtered) clearFilters()
    }, [filtered])

    const setFormFilters = (e) => {
        const value = e.target.value

        switch (e.target.name) {
            case 'formFactor':
                e.target.checked ? setFormFactor([...formFactor, value]) : setFormFactor(formFactor.filter(item => item !== value))
                break;
            case 'ram':
                e.target.checked ? setRam([...ram, value]) : setRam(ram.filter(item => item !== value))
                break;
            case 'os':
                e.target.checked ? setOs([...os, value]) : setOs(os.filter(item => item !== value))
                break;
            case 'processor':
                e.target.checked ? setProcessor([...processor, value]) : setProcessor(processor.filter(item => item !== value))
                break;
            case 'diskType':
                e.target.checked ? setDiskType([...diskType, value]) : setDiskType(diskType.filter(item => item !== value))
                break;
            case 'disk':
                e.target.checked ? setDisk([...disk, value]) : setDisk(disk.filter(item => item !== value))
                break;
            case 'minPrice':
                e.target.checked ? setMinPrice(value) : setMinPrice('')
                break;
            case 'maxPrice':
                e.target.checked ? setMaxPrice(value) : setMaxPrice('')
                break;
            default:
                break;
        }
    }

    const clearFilters = async () => {
        try {
            if (source === 'admin') setSearch('')
            
            setMinPrice('')
            setMaxPrice('')
            setFormFactor([])
            setRam([])
            setOs([])
            setProcessor([])
            setDiskType([])
            setDisk([])
            setFilters([])
            setSearchParams({})

            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                }

                if (input.type === 'text') input.value = ''
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (parseInt(minPrice) >= parseInt(maxPrice)) {
            setError('Max. price must be greater than min. price')
            return
        }

        const filters = {}
        if (formFactor) filters.formFactor = formFactor
        if (ram) filters.ram = ram
        if (os) filters.os = os
        if (processor) filters.processor = processor
        if (diskType) filters.diskType = diskType
        if (disk) filters.disk = disk
        if (minPrice) filters.minPrice = minPrice
        if (maxPrice) filters.maxPrice = maxPrice
        if (currentPage) filters.page = currentPage
        if (search) filters.search = search

        setSearchParams(filters)
        setFilters(filters)
        setFiltered(true)
    }

    return (
        <Form id="filter" onSubmit={handleSubmit}>
            {source === 'admin' ? <Row className='mb-2'>
                <Col>
                    <Form.Label className='fw-bold'>Search</Form.Label>
                    <Form.Control
                        id='search'
                        defaultValue={''}
                        onChange={(e) => setSearch(e.target.value)}
                        className='form-control search-input w-100'
                        placeholder='Ex.: Dell'
                    />
                </Col>
            </Row> : null }

            <Row className="align-items-center mb-2" style={{ height: `${source === 'admin' ? '250px' : 'auto'}`}}>
                <h5 className="border-bottom py-2">Filters</h5>
                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Form Factor</Form.Label>
                    <Form.Check
                        id='Laptop'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Laptop'}
                        label="Laptop"
                    />
                    <Form.Check
                        id='Desktop'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Desktop'}
                        label="Desktop"
                    />
                    <Form.Check
                        id='All-In-One'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'All-In-One'}
                        label="All-In-One"
                    />
                </Col>

                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Operative System</Form.Label>
                    <Form.Check
                        id='Windows'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Windows'}
                        label="Windows"
                    />
                    <Form.Check
                        id='MacOS'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'macOS'}
                        label="MacOS"
                    />
                    <Form.Check
                        id='Linux'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Linux'}
                        label="Linux"
                    />
                    <Form.Check
                        id='Ubuntu'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Ubuntu'}
                        label="Ubuntu"
                    />
                    <Form.Check
                        id='Solaris'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Solaris'}
                        label="Solaris"
                    />
                </Col>

                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Processor</Form.Label>
                    <div className='d-flex gap-2'>
                        <div>
                            <Form.Check
                                id='Intel i3'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i3'}
                                label="Intel i3"
                            />
                            <Form.Check
                                id='Intel i5'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i5'}
                                label="Intel i5"
                            />
                            <Form.Check
                                id='Intel i7'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i7'}
                                label="Intel i7"
                            />
                            <Form.Check
                                id='Intel i9'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i9'}
                                label="Intel i9"
                            />
                            <Form.Check
                                id='Apple (A-Series)'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Apple (A-Series)'}
                                label="Apple (A-Series)"
                            />
                        </div>
                        <div>
                            <Form.Check
                                id='ARM'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'ARM'}
                                label="ARM"
                            />
                            <Form.Check
                                id='MediaTek'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'MediaTek'}
                                label="MediaTek"
                            />
                            <Form.Check
                                id='AMD'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'AMD'}
                                label="AMD"
                            />
                            <Form.Check
                                id='Qualcomm'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Qualcomm'}
                                label="Qualcomm"
                            />
                            <Form.Check
                                id='Huawei (Kirin)'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Huawei (Kirin)'}
                                label="Huawei (Kirin)"
                            />
                        </div>
                    </div>
                </Col>

                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Ram</Form.Label>
                    <Form.Check
                        id='4GB'
                        name='ram'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'4GB'}
                        label="4GB"
                    />
                    <Form.Check
                        id='8GB'
                        name='ram'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'8GB'}
                        label="8GB"
                    />
                    <Form.Check
                        id='16GB'
                        name='ram'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'16GB'}
                        label="16GB"
                    />
                    <Form.Check
                        id='32GB'
                        name='ram'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'32GB'}
                        label="32GB"
                    />
                </Col>
                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Disk Type</Form.Label>
                    <Form.Check
                        id='HDD'
                        name='diskType'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'HDD'}
                        label="HDD"
                    />
                    <Form.Check
                        id='SSD'
                        name='diskType'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'SSD'}
                        label="SSD"
                    />
                </Col>
                <Col className='h-100 py-2' xs={`${source === 'admin' ? '' : 12}`}>
                    <Form.Label className='fw-bold'>Disk Capacity</Form.Label>
                    <Form.Check
                        id='128GB'
                        name='disk'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'128GB'}
                        label="128GB"
                    />
                    <Form.Check
                        id='256GB'
                        name='disk'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'256GB'}
                        label="256GB"
                    />
                    <Form.Check
                        id='500GB'
                        name='disk'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'500GB'}
                        label="500GB"
                    />
                    <Form.Check
                        id='1TB'
                        name='disk'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'1TB'}
                        label="1TB"
                    />
                    <Form.Check
                        id='2TB'
                        name='disk'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'2TB'}
                        label="2TB"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={`${source === 'admin' ? 4 : 12}`} className={`${source === 'admin' ? 'd-flex gap-2' : ''}`}>
                    <Button disabled={disabled} type="submit" className="btn btn-dark w-100 my-1">
                        <i className="bi bi-funnel"></i> Filter
                    </Button>
                    {<Button onClick={clearFilters} type="button" className="btn btn-danger w-100 my-1" disabled={disabled}>
                        <FaTrashAlt /> Clear filters
                    </Button>}
                </Col>
            </Row>
        </Form>
    )
}
