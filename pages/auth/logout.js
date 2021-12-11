import React from "react";
import Auth from "layouts/Auth.js";
import { fetchData } from "helpers/fetcher";

function Logout() {
  fetchData("/api/logout");

  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="py-12 text-xl font-bold text-center text-green-700">
                <i className="text-3xl fas fa-check-circle" />
                <p>Successfully logged out.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;

Logout.layout = Auth;
