import React, { useEffect, useState } from 'react'
import Layout from './Layout'

export default function FeedBack({type, message}) {
    console.log(type, message)

    return (
      <Layout >
          <section className="card p-5 my-5 col-sm-6 mx-auto">
                <div className='card-body'>
                    <p className={`alert alert-${type}`}>
                        {message}
                    </p>
                </div>

                <div className='card-footer bg-white'>
                    <a href='/' className='btn btn-primary'>Continue shopping</a>
                </div>
          </section>
      </Layout>
  )
}
