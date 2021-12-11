import React from "react";

function Modal({
  title,
  icon = "fa-user",
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  closeText = "Close",
  show = false,
}) {
  if (!show) {
    return null;
  }
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full min-h-screen bg-pink-600 bg-opacity-20 z-3">
      <div className="bg-white rounded-lg">
        <div className="flex border-t-8 border-pink-600 rounded-lg w-96">
          <div className="flex justify-center w-1/3 pt-6">
            <i
              className={
                "w-16 h-16 p-3 text-4xl text-center text-white bg-pink-600 rounded-full fas " +
                icon
              }
            />
          </div>
          <div className="w-full pr-4 pt-9">
            <h3 className="font-bold text-pink-700">{title}</h3>
            <p className="py-4 text-sm text-gray-400">{children}</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4">
          <a
            onClick={onClose}
            className="w-1/2 px-4 py-3 text-sm font-bold text-center text-gray-400 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black"
          >
            {closeText}
          </a>
          <a
            onClick={onConfirm}
            className="w-1/2 px-4 py-3 text-sm font-bold text-center text-pink-100 bg-pink-600 rounded-lg cursor-pointer hover:bg-pink-700 hover:text-white"
          >
            {confirmText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Modal;
