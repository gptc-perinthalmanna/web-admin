import React from "react";
import ClickAndEditBtn from "./ClickAndEditBtn";

function UserCard({
  name,
  phone,
  key,
  designation,
  department,
  socialLinks,
  onEdit,
  onDelete,
  avatar,
}) {
  return (
    <div className="max-w-sm w-full">
      <div className="overflow-hidden h-32 border-2 rounded-md bg-indigo-50 shadow-md border-sky-100">
        <div className="flex">
          <img className="w-24 h-32 object-cover" src={avatar} />

          <div className="flex-grow p-2">
            <h3 className="text-lg font-bold text-rose-800">{name}</h3>
            <h5 className="text-gray-600 text-sm">
              {designation}, {department}
            </h5>
            <p className="text-xs text-rose-400">{key}</p>
            <div className="flex my-2 text-gray-600">
              {phone && phone.length > 0 && (
                <i className="mr-2 fas fa-phone-alt"></i>
              )}
              {socialLinks && socialLinks.facebook && (
                <i className="mr-2 fab fa-facebook"></i>
              )}
              {socialLinks && socialLinks.linkedin && (
                <i className="mr-2 fab fa-linkedin"></i>
              )}
              {socialLinks && socialLinks.instagram && (
                <i className="mr-2 fab fa-instagram"></i>
              )}
            </div>
          </div>
          <div className="mr-2 mt-2">
            <ClickAndEditBtn onDelete={onDelete} onEdit={onEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

function Loading() {
  return (
    <>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
      <div className="w-full p-3 xl:w-1/2">
        <div className="flex items-center justify-center h-40 my-2 overflow-hidden text-xl ease-in-out bg-gray-300 border-transparent rounded-lg shadow-lg animate-pulse">
          {/* <p><i className="mr-3 fas fa-spinner animate-spin" />Loading...</p> */}
        </div>
      </div>
    </>
  );
}

UserCard.Loading = Loading;
