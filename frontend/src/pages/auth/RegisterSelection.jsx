import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterSelection() {
    return (
        <div
            className='container mt-5'
        >
            <div className='row  gap-3 justify-content-center'>
                <Link to="/buyer/register"
                className='btn btn-primary col-12 col-sm-4 p-4 '
                >Buyer</Link>
                <Link to="/seller/register"
                className='btn btn-success col-12 col-sm-4 p-4'
                >Seller</Link>
            </div>
        </div>
    )
}
