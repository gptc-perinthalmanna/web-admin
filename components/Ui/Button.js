import React from 'react'

function Button({children, ...props}) {
    return (
        <button {...props} className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-blueGray-600 hover:bg-blueGray-500 hover:shadow-md focus:outline-none">
       {children}
        </button>
    )
}

export default Button
