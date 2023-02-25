/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from "./../assets/images/MoovieTime-Logo.svg";

import { MdOutlineMovie, MdSearch } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import Searchbar from "./Searchbar";

const Detail = () => {
  return (
    <header className="bg-dark container">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-5"
        aria-label="Global"
      >
        <div className="flex">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Moovie Time</span>
            <img className="h-8 w-auto" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-light-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="lg:flex lg:gap-x-12 lg:flex-1">
          <div className="w-full h-full pl-10 pr-10 flex relative">
            <div className="h-full bg-darken p-3 rounded-tl-lg rounded-bl-lg">
              <MdOutlineMovie className="text-gray" size={20} />
            </div>
            <Searchbar />
            <div className="h-full bg-darken p-3 rounded-tr-lg rounded-br-lg">
              <MdSearch className="text-light" size={20} />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-0 lg:justify-end gap-10">
          <a
            href="/list"
            className="text-sm font-semibold leading-6 text-light uppercase"
          >
            <div className="flex items-center gap-3">
              <BsGridFill />
              Categories
            </div>
          </a>
          <a
            href="/list"
            className="text-sm font-semibold leading-6 text-light uppercase"
          >
            Movies
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-light uppercase"
          >
            TV Shows
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-light uppercase"
          >
            Log in
          </a>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
      </div>
    </header>
  );
};

export default Detail;
