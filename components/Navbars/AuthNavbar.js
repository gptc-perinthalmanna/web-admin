import React from "react";
import Link from "next/link";


export default function Navbar(props) {
  return (
    <>
      <nav className="absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
                href="#pablo"
              >
                GPTC Admin
              </a>
            </Link>
     
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
             " block rounded shadow-lg"
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col mr-auto list-none lg:flex-row">
              
            </ul>
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
            
             

              <li className="flex items-center">
                <button
                  className="px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none text-blueGray-700 active:bg-blueGray-50 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Visit Website
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
