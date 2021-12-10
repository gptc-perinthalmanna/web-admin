import ClickAndEditBtn from 'components/Ui/ClickAndEditBtn'
import DecoratedText from 'components/Ui/DecoratedText'
import React from 'react'

function FilesItem({title, date, description, link, tags, onEdit, onDelete}) {
    return (
        <div className="flex overflow-hidden bg-white border-transparent rounded-lg shadow-lg">
        <div className="flex flex-col flex-grow p-5 text-gray-700 bg-teal-50">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <h3 className="font-bold">{date}</h3>
          </div>
          <div className="flex-grow">
            <p className="text-sm">
             {description}
            </p>
          </div>
          <div className="flex-grow-0">
            <DecoratedText title="File Link" text={link} />
          </div>
          <div className="flex">
            <div className="flex flex-wrap flex-grow text-xs">
                <p>Tags : 
                    {tags.map((tag, index) => (
              <span key={tag} className="inline-block px-2 py-1 mx-1 text-xs font-semibold text-orange-600 uppercase bg-orange-200 rounded last:mr-0">
                {tag}
              </span>

                    ))}
              </p>
            </div>
            <div className="flex-shrink-0">
             <ClickAndEditBtn onDelete={onDelete} onEdit={onEdit} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default FilesItem
