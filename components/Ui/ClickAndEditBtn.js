import React from "react";

function ClickAndEditBtn({ onDelete, onEdit }) {
  return (
    <>
      {onEdit && (
        <a
          onClick={onEdit}
          className="pr-1 mx-2  border-gray-500 cursor-pointer hover:text-blue-700 "
        >
          <i className="fas fa-edit"></i>
        </a>
      )}
      {onDelete && (
        <a
          onClick={onDelete}
          className="mx-2 cursor-pointer hover:text-red-700 "
        >
          <i className="fas fa-trash-alt"></i>
        </a>
      )}
    </>
  );
}

export default ClickAndEditBtn;
