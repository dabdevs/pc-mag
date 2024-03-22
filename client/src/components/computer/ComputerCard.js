import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ComputerCard({ computer }) {
    const navigate = useNavigate()
    return (
        <div className="my-2 computer-card" role='button' onClick={() => navigate(`/computers/${computer._id}/${computer.name.split(' ').join(' - ')}`)}>
            <div className="card h-100 d-none d-sm-block">
                <img className="card-img-top" height={150} src={computer?.images[0] ? computer.images[0] : '../../img/default-computer-img.jpg'} alt={'Computer image'} />

                <div className="card-body pt-2 pb-0 px-2">
                    <div className="h-100 d-flex align-content-between flex-wrap">
                        <h5 className="text-center fw-bolder text-truncate">{computer.name}</h5>

                        <div className='text-center w-100 justify-content-between d-flex gap-3'>
                            <small>
                                <i className="bi bi-cpu mr-1"></i> {computer.ram}
                            </small>
                            <small> 
                                <i className='bi bi-hdd mr-1'></i> 
                                {computer.disk}
                            </small>
                            <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {computer.display}"</small>
                        </div>

                        <div className='text-center w-100'>
                            <h4 className='text-danger font-weight-bold'>$ {(parseFloat(computer.price) / 100).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-transparent">
                    <div className="text-center">
                        <Link to={`/computers/${computer._id}/${computer.name.split(' ').join('-')}`} type='button' className='btn btn-sm btn-outline-dark px-4'>View specs</Link>
                    </div>
                </div>
            </div>

            <div className="d-flex d-sm-none bg-white p-2">
                <div className='w-50'>
                    <img className="w-100" height={150} src={computer?.images[0] ? computer.images[0] : '../../img/default-computer-img.jpg'} alt={'Computer image'} />
                </div>

                <div className="pt-2 pb-0 px-2 w-50">
                    <div className="h-100">
                        <h5 className="text-center fw-bolder text-truncate mb-3">{computer.name}</h5>

                        <div className='text-center w-100 justify-content-between d-flex gap-3'>
                            <small>
                                <i className="bi bi-cpu mr-1"></i> {computer.ram}
                            </small>
                            <small>
                                <i className='bi bi-hdd mr-1'></i>
                                {computer.disk}
                            </small>
                            <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {computer.display}"</small>
                        </div>

                        <div className='text-center w-100'>
                            <h4 className='text-danger font-weight-bold'>$ {(parseFloat(computer.price) / 100).toFixed(2)}</h4>
                        </div>
                        <div className="text-center">
                            <Link to={`/computers/${computer._id}/${computer.name.split(' ').join('-')}`} type='button' className='btn btn-sm btn-outline-dark px-4'>View specs</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
