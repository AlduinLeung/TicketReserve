import React from 'react'
import './Highspeed.css'
import propTypes from 'prop-types'
import classnames from 'classnames'
export default function HighSpeed(props){
    const {
        highSpeed,
        toggle,
    }=props
    return(
        <div className="high-speed">
                <div className="high-speed-label">只看高铁/动车</div>
                <div className="high-speed-switch" onClick={()=>toggle()}>
                <input type="hidden" name='highSpeed' value={highSpeed} />
                <div className={classnames('high-speed-track',{checked:highSpeed,})}>
                    <span className={classnames('high-speed-handle',{
                        checked:highSpeed,
                    })}></span>
                </div>
                </div>
        </div>
    )
}
HighSpeed.propTypes={
    highSpeed:propTypes.bool.isRequired,
    toggle:propTypes.func.isRequired
}