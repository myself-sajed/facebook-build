import React from 'react'
import './Loader.css'

const Loader = () => {
    return (

        <div className="loader__wrapper">

            <img src={'/assets/logo.png'} className="rotate" width="100" height="100" alt="" />
            <p>Fetching Feed...</p>

        </div>
    )
}

export default Loader