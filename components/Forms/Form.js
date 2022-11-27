import React, { useState, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

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
Form.Image = UploadImage;
Form.DatePicker = DateSelect;
Form.TagsInput = TagsInput;
Form.Error = Error;
Form.MultiImage = MultiImageUpload;

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

function Button({ title = "Save", className = "", ...props }) {
  return (
    <button
      type="submit"
      className={
        "px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-md focus:outline-none " +
        className
      }
      {...props}
    >
      {title}
    </button>
  );
}

function TextInput({ size, label, ...props }) {
  let sizeClass;
  switch (size) {
    case "1/2":
      sizeClass = "w-full lg:w-1/2";
      break;
    case "1/3":
      sizeClass = "w-full lg:w-1/3";
      break;
    case "1/4":
      sizeClass = "w-full lg:w-1/4";
      break;
    default:
      sizeClass = "w-full";
  }

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

function UploadImage({
  setUrl = (object) => console.log(object),
  setKey = (object) => console.log(object),
  uploadAgain = 0,
  label = "Upload image",
}) {
  const [file, setFile] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      const i = event.target.files[0];
      setFile(i);
      setCreateObjectURL(URL.createObjectURL(i));

      const body = new FormData();

      body.append("file", i);
      const response = await fetch("/api/public/media/upload", {
        method: "POST",
        body,
      });
      const res = await response.json();
      setUrl(res.url);
      setKey(res.key);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        {label}
      </label>
      <div className="flex flex-col ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {createObjectURL && (
          <div className="relative w-40 h-40 mb-3 overflow-hidden rounded-md ">
            <Image
              src={createObjectURL}
              layout="fill"
              objectFit="cover"
              alt="sample"
            />
          </div>
        )}
        <div className="flex items-center">
          <input
            onChange={uploadToClient}
            type="file"
            className="px-3 py-3 mr-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow w-96 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
          >
            {/* <i className="mr-2 fas fa-file-image" /> Choose Image */}
          </input>
          {loading && (
            <p className="mr-3 text-green-600 animate-pulse ">
              Uploading to server...
            </p>
          )}
          {!loading && (
            <p className="mr-3 text-green-600 ">
              <i className="fas fa-check" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DateSelect({ label, startDate, onChange, ...props }) {
  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        {label}
      </label>
      <DatePicker selected={startDate} onChange={onChange} {...props} />
    </div>
  );
}

function Error({ children }) {
  return (
    <div className="flex items-center justify-center px-4 mb-2 text-xs text-center text-red-600 capitalize">
      <i className="mr-1 fas fa-exclamation-circle" /> {children}
    </div>
  );
}

function TagsInput({ label, options, defaultValue, ...props }) {
  const [defaultv, setDefault] = useState(null);
  useEffect(() => {
    setDefault(defaultValue);
  }, [defaultValue]);
  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        {label}
      </label>
      <Select options={options} {...props} defaultValue={defaultv} isMulti />
    </div>
  );
}

function MultiImageUpload({ onUpload = () => null, onChange }) {
  const [loading, setLoading] = React.useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      const i = event.target.files[0];
      const body = new FormData();
      body.append("file", i);
      const response = await fetch("/api/public/media/upload", {
        method: "POST",
        body,
      });
      const res = await response.json();
      onUpload(res.url);
      setImageUrls([...imageUrls, res.url]);
      onChange([...imageUrls, res.url]);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        Upload Images
      </label>
      <div className="flex flex-col ">
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <div className="relative flex items-center flex-wrap gap-4 mb-3 rounded-md">
          {imageUrls.map((e, i) => (
            <div
              className="relative rounded group shadow overflow-hidden"
              key={`${e}${i}`}
            >
              <Image
                src={e}
                layout="fixed"
                className="relative"
                objectFit="cover"
                width={160}
                height={160}
                alt="sample"
              />
              <i
                onClick={() => {
                  const img = imageUrls.filter((k) => k !== e);
                  setImageUrls(img);
                  onChange(img);
                }}
                className="fa invisible group-hover:visible p-2 rounded bg-rose-500 text-white fa-trash absolute top-3 right-3"
              />
            </div>
          ))}
          <label className="flex text-center cursor-pointer hover:bg-gray-100 items-center justify-center  transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring h-40 w-40">
            <input onChange={uploadToClient} type="file" className="hidden">
              {/* <i className="mr-2 fas fa-file-image" /> Choose Image */}
            </input>
            <div>
              <i
                className={`fas text-4xl ${
                  loading ? "fa-spinner animate-spin" : "fa-upload"
                }`}
              />
              <p>Upload Image</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
