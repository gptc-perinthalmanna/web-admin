import React from "react";
import Link from "next/link";


export default function Navbar(props) {
  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 bg-white shadow navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase text-blueGray-700 whitespace-nowrap"
                href="#pablo"
              >
                GPTC Perinthalmanna - Website Admin
              </a>
            </Link>
         
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
             " block" 
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              

              <li className="flex items-center">
                <a
                  className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                  href="https://gptcperinthalmanna.in"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Go To Official Website 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
