import React from 'react'

function MinimalUserCard({name, description, onClick}) {
    return (
        <div className="relative flex p-2 pr-3 m-2 bg-gray-200 border-2 rounded-md">
           { onClick && <div onClick={onClick} className="absolute px-2 py-1 text-xs text-white rounded-full cursor-pointer hover:bg-rose-500 -top-2 -right-2 bg-rose-600" >
                <i className='fas fa-times' />
            </div>}
        <i className="mr-3 text-2xl text-gray-600 fas fa-user-circle"></i>
        <div>
         <h3 className="font-bold">{name}</h3>
         <p className="text-xs">{description}</p>
        </div>
    </div>
    )
}

export default MinimalUserCard
