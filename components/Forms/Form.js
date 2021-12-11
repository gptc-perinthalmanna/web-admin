import React from "react";
export default function Form({ children, ...props }) {
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
        <form {...props}>{children}</form>
      </div>
    </>
  );
}

Form.Title = FormTitle;
Form.Button = Button;
Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.Section = FormSection;

function FormTitle({ title, children }) {
  return (
    <div className="px-6 py-6 mb-0 bg-white rounded-t">
      <div className="flex justify-between text-center">
        <h6 className="text-xl font-bold text-blueGray-700">{title}</h6>
        {children}
      </div>
    </div>
  );
}

function Button({ title = "Save", ...props }) {
  return (
    <button
      className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-md focus:outline-none"
      {...props}
    >
      {title}
    </button>
  );
}

function TextInput({ size, label, ...props }) {
  const sizeClass =
    size === "1/2"
      ? "w-full lg:w-1/2"
      : props.size === "1/3"
      ? "w-full lg:w-1/3"
      : "w-full";

  return (
    <div className={" px-4 " + sizeClass}>
      <div className="relative w-full mb-3">
        <label
          className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
          htmlFor="grid-password"
        >
          {label}
        </label>
        <input
          className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          {...props}
        />
      </div>
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        {label}
      </label>
      <textarea
        type="text"
        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
        rows="4"
        {...props}
      ></textarea>
    </div>
  );
}

function FormSection({ children, title }) {
  return (
    <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
      <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
        {title}
      </h6>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
}
