import React from 'react'
import './header.css'
import propTypes from 'prop-types'
export default function Header(props){
    const {
        onBack,
        title
    }=props;
    return(
        <div className='header'>
            <div className='header-back' 
            onClick={onBack}>
                <svg height="42" width='42'>
                    <polyline 
                        points='25,13 16,21 25,29'
                        stroke='#fff'
                        strokeWidth='2'
                        fill='none'
                    />
                </svg>
            </div>
            <h1 className='header-title'>
                    {title}
            </h1>
        </div>
    )
}

Header.propTypes={
    onBack:propTypes.func,
    title:propTypes.string,
}