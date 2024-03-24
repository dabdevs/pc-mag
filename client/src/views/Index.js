import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import SearchForm from '../components/SearchForm'
import Menu from '../components/Menu'
import ComputersTable from '../components/computer/ComputersTable'
import { getComputerFormData } from '../api/computers'
import Filter from '../components/computer/Filter'

export default function Index() {
    const [loading, setLoading] = useState(false)
    const [computerFormData, setComputerFormData] = useState(false)

    useEffect(() => {
        getComputerFormData().then((data) => {
            localStorage.setItem('computerFormData', JSON.stringify(data))
            setComputerFormData(data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Layout>
                <section className="py-3 banner" style={{ overflow: 'hidden' }}>
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="text-center text-white row">
                            <h1 className="display-4 text-shadow fw-bolder mb-0">Shop Computers & Accesories</h1>
                            <p className="fw-normal text-white mb-0">Find your next great computer.</p>
                            <div className='col-sm-6 mx-auto'>
                                <SearchForm />
                            </div>
                        </div>
                    </div>
                </section>

                <section className='row p-lg-4 background-gray'>
                    <div className='d-none d-sm-block col-sm-3 col-lg-2 px-2'>
                        <Filter />
                    </div>

                    <div className='d-sm-none col-sm-3 col-lg-2 p-4'>
                        <Filter display='mobile' />
                    </div>

                    <div className="col-sm-9 col-lg-10 ms-sm-auto p-4" >
                        <Menu data={computerFormData}/>

                        {loading ?
                            <b>Loading...</b> :
                            <ComputersTable display={'cards'} />
                        }
                    </div >
                </section>
            </Layout>
        </div>
    )
}
