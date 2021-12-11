import React from 'react'

function PageTitle({children}) {
    return (
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{children}</h2>
    )
}

export default PageTitle
