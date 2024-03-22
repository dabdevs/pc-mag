import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComputerCarousel from '../components/computer/ComputerCarousel';
import ComputerInfo from '../components/computer/ComputerInfo';
import SimilarProducts from '../components/SimilarProducts';
import { getById } from '../api/computers';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';

export default function Computer() {
    const [computer, setComputer] = useState(null)
    const [similarComputers, setSimilarProducts] = useState([])
    const { computerId } = useParams()

    useEffect(() => {
        getById(computerId)
            .then(data => {
                setComputer(data.computer)
                setSimilarProducts(data.similarComputers)
            }).then(() => window.scrollTo({
                top: 0,
                behavior: 'smooth',
            }))
            .catch(err => console.error(err))
    }, [computerId]);

    return (
        <Layout>
            {computer ? (<section className="container">
                <div className="row p-2 align-items-center" style={{ height: '400px' }}>
                    <ComputerCarousel computer={computer} />
                    <ComputerInfo computer={computer} />
                    <SimilarProducts products={similarComputers} category='Computers' />
                </div>
            </section>) :
                <Spinner />
            }
        </Layout>
    )
}
