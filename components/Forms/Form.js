import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";

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
}) {
  const [file, setFile] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
      setCreateObjectURL(URL.createObjectURL(i));
      setLoading(true);
      uploadToServer();
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    if (!file) {
      setLoading(false);
      return;
    }
    body.append("file", file);
    const response = await fetch("/api/public/media/upload", {
      method: "POST",
      body,
    });
    setLoading(false);
    const res = await response.json();
    setUrl(res.url);
    setKey(res.key);
  };

  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        UploadImage
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

function DateSelect({ label, setDate = (object) => console.log(object) }) {
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <div className="relative w-full px-4 mb-3">
      <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600">
        {label}
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setDate(date);
        }}
      />
    </div>
  );
}
