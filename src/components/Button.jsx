import React from 'react'

const Button = (props) => {
    return (
    <div className={props.class}>
        <button className={`block mt-5 bg-orange-500 px-4 py-1 rounded-md text-white hover:bg-orange-600 active:bg-orange-700 sm:mt-10 ${props.className}`} type={props.type} onClick={props.onClick}>{props.text}</button>
    </div>
)
}

export default Button
