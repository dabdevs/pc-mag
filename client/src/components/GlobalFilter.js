import React from 'react'

export default function GlobalFilter({ filter, setFilter, setSearch }) {
    return (
        <div className='card p-2 mb-2 w-100'>
            <h5>Filters</h5>

            <div className='row'>
                <div className='col-sm-12'>
                    <input 
                        id='search' 
                        value={filter || ''}
                        onChange={(e) => setFilter(e.target.value)}
                        className='form-control search-input' placeholder='Filter by name' />
                </div>
                <div className='col-sm-3'>
                    <select className='form-control my-2'>
                        <option>Operative System</option>
                        <option>Windows</option>
                        <option>Mac OS</option>
                        <option>Linux</option>
                    </select>
                </div>
                <div className='col-sm-3'>
                    <select className='form-control my-2'>
                        <option>Form Factor</option>
                        <option>Windows</option>
                        <option>Mac OS</option>
                        <option>Linux</option>
                    </select>
                </div>
                <div className='col-sm-3'>
                    <select className='form-control my-2'>
                        <option>Processor</option>
                        <option>Intel i3</option>
                        <option>Intel i5</option>
                        <option>Intel i7</option>
                        <option>Intel i9</option>
                        <option>Amd</option>
                    </select>
                </div>
                <div className='col-sm-3'>
                    <select className='form-control my-2'>
                        <option>Disk Type</option>
                        <option>HDD</option>
                        <option>SSD</option>
                    </select>
                </div>
                <div className='col-sm-12'>
                    <h6>Ram</h6>
                    <input type='checkbox' value={'4 GB'} /> 4 GB &nbsp;&nbsp;
                    <input type='checkbox' value={'8 GB'} /> 8 GB &nbsp;&nbsp;
                    <input type='checkbox' value={'16 GB'} /> 16 GB &nbsp;&nbsp;
                    <input type='checkbox' value={'32 GB'} /> 32 GB &nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}

