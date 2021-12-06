import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Menu({ title, children }) {
  return (
    <>
      {/* Divider */}
      <hr className="my-4 md:min-w-full" />
      {/* Heading */}
      <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
        {title}
      </h6>
      {/* Navigation */}

      <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
        {children}
      </ul>
    </>
  );
}

export default Menu;

function Item({ title, icon = "fingerprint", link = "/" }) {
  const router = useRouter();
  return (
    <li className="items-center">
      <Link href={link}>
        <a
          className={
            "block py-1 text-xs font-bold uppercase cursor-pointer text-blueGray-700 hover:text-blueGray-500 " +
            (router.pathname.indexOf(link) !== -1
              ? "text-lightBlue-500 hover:text-lightBlue-600"
              : "text-blueGray-700 hover:text-blueGray-500")
          }
        >
          <i
            className={"mr-2 text-sm fas text-blueGray-400 " + `${icon}`}
          ></i>
          {title}
        </a>
      </Link>
    </li>
  );
}

Menu.Item = Item;
