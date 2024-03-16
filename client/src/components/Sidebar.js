import React, { useEffect, useState } from 'react'
import { useComputersContext } from '../context/ComputersContext';
import { useSearchParams } from 'react-router-dom';
import Filter from './computer/Filter';

export default function Sidebar() {
    return (
        <div id="sidebar" className="col-sm-3 col-lg-2 d-none d-md-block">
            <div className="position-sticky card p-3">
                <h5 className="border-bottom py-2">Filter Computers</h5>
                <Filter />
            </div>
        </div>
    )
}
