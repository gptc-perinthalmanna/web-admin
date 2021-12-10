import React from 'react'

function MinimalUserCard({name, description}) {
    return (
        <div className="flex p-2 pr-3 m-2 bg-gray-200 border-2 rounded-md">
        <i className="mr-3 text-2xl text-gray-600 fas fa-user-circle"></i>
        <div>
         <h3 className="font-bold">{name}</h3>
         <p className="text-xs">{description}</p>
        </div>
    </div>
    )
}

export default MinimalUserCard
