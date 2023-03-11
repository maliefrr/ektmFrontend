import React from 'react'

const InputForm = (props) => {
    return (
    <>
    <div className={props.class}>
        <label htmlFor={props.id} className="sm:mb-8">
            <div className="text-slate-800 mb-2">{props.label}</div>
            <input
                type={props.type}
                className={`border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer`}
                placeholder={props.placeholder}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disable}
            />
        </label> 
    </div>
    </>
    )
}

export default InputForm    