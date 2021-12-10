import React from 'react'

function DecoratedText({title, text}) {
    return (
        <div className="flex my-2 overflow-hidden text-xs border-2 border-red-500 rounded-xl bg-rose-50">
        <p className="p-2 font-bold text-white bg-red-500 h-100">{title}</p>{" "}
      <p className="p-2 flex-grow-1">
        {text}
      </p>
    </div>
    )
}

export default DecoratedText
