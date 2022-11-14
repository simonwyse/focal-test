import React from 'react'
import { Link } from 'gatsby' // eslint-disable-line

const Banner = props => {
    if(props.data.display) {
        return (
            <div className="has-bg-dark-turquoise is-white" style={{'marginTop': '2px'}}>
                <div className="container">
                    <div className="section py-4">
                        <p>{props.data.title && (<b>{props.data.title}: </b>)}{props.data.text}</p>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default Banner