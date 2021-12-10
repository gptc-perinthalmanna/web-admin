import React from "react";
import ClickAndEditBtn from "./ClickAndEditBtn";

function UserCard() {
  return (
    <div className="p-3 border-2 rounded-md bg-rose-50 border-rose-500">
      <div className="flex">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-rose-800">Amjed Ali</h3>
          <h5 className="text-gray-600">
            Tradesman, Electronics Engineering Dept
          </h5>
          <p className="text-xs text-rose-400">
            234432-23esdf32f-f23f23-23f33f
          </p>
          <div className="flex my-2 text-gray-600">
            <i className="mr-2 fas fa-phone-alt"></i>
            <i className="mr-2 fab fa-facebook"></i>
            <i className="mr-2 fab fa-linkedin"></i>
            <i className="mr-2 fab fa-instagram"></i>
          </div>
        </div>
        <div>
          <ClickAndEditBtn onDelete={() => {}} onEdit={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default UserCard;
