import React from 'react';
import { SyncLoader } from 'react-spinners';
import './LoadingSpinner.css'

function LoadingSpinner() {
    return(
        <div className='loader-padding'>
            <div className='loader'>
                <SyncLoader
                color={'white'}  
                />
            </div>
        </div>
    )
}

export default LoadingSpinner