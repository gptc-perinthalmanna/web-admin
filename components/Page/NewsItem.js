import React from 'react'
import ClickAndEditBtn from "components/Ui/ClickAndEditBtn";

function NewsItem({ title, decription, author, date, onEdit, onDelete }) {
    return (
        <div className="w-full p-3 xl:w-1/2">
          <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
            <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{title}</h3>
                <h3 className="font-bold">{date}</h3>
              </div>
              <div className="flex-grow pb-2">
                <p className="text-sm">
                  {decription}
                </p>
              </div>
              <div className="flex">
                <div className="flex flex-wrap flex-grow">
                  <span className="inline-block px-2 py-1 mr-1 text-xs font-semibold text-red-600 uppercase bg-red-200 rounded last:mr-0">
                    <i className="mr-1 fas fa-user" /> {author}
                  </span>
                </div>
                <div className="flex-shrink-0">
                <ClickAndEditBtn onEdit={onEdit} onDelete={onDelete} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default NewsItem

function Loading() {
    return (
      <>
      <div className="w-full p-3 xl:w-1/2">
      <div className="flex items-center justify-center h-20 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
        {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div><div className="w-full p-3 xl:w-1/2">
      <div className="flex items-center justify-center h-20 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
        {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
      </>
   
    )
  }
  
  NewsItem.Loading = Loading;