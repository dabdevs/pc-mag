import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext';

export default function Sidebar({ category }) {
    const { handleFilter } = useProductsContext()
    const [formFactor, setFormFactor] = useState([]);
    const [ram, setRam] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [error, setError] = useState('')

    const disabled = formFactor.length === 0 && ram.length === 0 && processor.length === 0 && maxPrice === '' && minPrice === ''

    const setFormFilter = (e) => {
        const value = e.target.value

        switch (e.target.name) {
            case 'formFactor':
                e.target.checked ? setFormFactor([...formFactor, value]) : setFormFactor(formFactor.filter(item => item !== value))
                break;

            case 'ram':
                e.target.checked ? setRam([...ram, value]) : setRam(ram.filter(item => item !== value))
                break;

            case 'processor':
                e.target.checked ? setProcessor([...processor, value]) : setProcessor(processor.filter(item => item !== value))
                break;
        
            default:
                break;
        }

        
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (parseInt(minPrice) >= parseInt(maxPrice)) {
            setError('Max. price must be greater than min. price')
            return
        }

        handleFilter({ formFactor, ram, processor, minPrice, maxPrice }, category)
    };

    return (
        <div id="sidebar" className="col-sm-3 col-lg-2 d-none d-md-block">
            <div className="position-sticky card p-3">
                <h5 className="border-bottom py-2">Filter Products</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="filterPrice" className="form-label">By Price</label>
                        <div id="filterPrice" className='d-flex gap-2 w-100'>
                            <div>
                                <label htmlFor="minPrice" className="form-label"><small>Min. Price</small></label>
                                <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" type="number" className="form-control" min={300} max={8000} />
                            </div>

                            <div>
                                <label htmlFor="maxPrice" className="form-label"><small>Max. Price</small></label>
                                <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" type="number" className="form-control" min={500} max={20000} />
                            </div>
                        </div>
                    </div>

                    <div className={category ? 'mb-3 d-none' : 'mb-3'}>
                        <label htmlFor="filterdisk" className="form-label">By Device Type</label>
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <input
                                    id='notebook'
                                    name='formFactor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'notebook'}
                                    className='form-check-input' />
                                <label htmlFor='notebook'>&nbsp; Notebook</label>
                            </div>
                            <div>
                                <input
                                    id='desktop'
                                    name='formFactor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'desktop'}
                                    className='form-check-input' />
                                <label htmlFor='desktop'>&nbsp; Desktop</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="filterdisk" className="form-label">By Processor</label>
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <input
                                    id='i3'
                                    name='processor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'Intel i3'}
                                    className='form-check-input' />
                                <label htmlFor='i3'>&nbsp; Intel® Core™ i3</label>
                            </div>
                            <div>
                                <input
                                    id='i5'
                                    name='processor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'Intel i5'}
                                    className='form-check-input' />
                                <label htmlFor='i5'>&nbsp; Intel® Core™ i5</label>
                            </div>
                            <div>
                                <input
                                    id='i7'
                                    name='processor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'Intel i7'}
                                    className='form-check-input' />
                                <label htmlFor='i7'>&nbsp; Intel® Core™ i7</label>
                            </div>
                            <div>
                                <input
                                    id='amd'
                                    name='processor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'amd'}
                                    className='form-check-input' />
                                <label htmlFor='amd'>&nbsp; AMD Ryzen</label>
                            </div>
                            <div>
                                <input
                                    id='apple'
                                    name='processor'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'Apple M1'}
                                    className='form-check-input' />
                                <label htmlFor='apple'>&nbsp; Apple M1</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="filterRam" className="form-label">By Ram</label>
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <input
                                    id='4GB'
                                    name='ram'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'4GB'}
                                    className='form-check-input'
                                />
                                <label htmlFor='4GB'>&nbsp; 4GB</label>
                            </div>
                            <div>
                                <input
                                    id='8GB'
                                    name='ram'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'8GB'}
                                    className='form-check-input'
                                />
                                <label htmlFor='8GB'>&nbsp; 8GB</label>
                            </div>
                            <div>
                                <input
                                    id='16GB'
                                    name='ram'
                                    onChange={setFormFilter}
                                    type='checkbox'
                                    value={'16GB'}
                                    className='form-check-input'
                                />
                                <label htmlFor='16GB'>&nbsp; 16GB</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        {error && (<small className='mt-2 text-danger'>{error}</small>)}
                    </div>
                    <button disabled={disabled} type="submit" className="btn btn-dark w-100"><i className="bi bi-funnel"></i> Filter</button>
                </form>
            </div>
        </div>
    )
}
