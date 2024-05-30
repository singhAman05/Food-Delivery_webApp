import React from "react";
import { Youtube, Twitter, LinkedIn, Instagram } from "../../utils/icons/Icons";

const Footer = () => {
  return (
    <section className="w-full bg-gunmetal py-24 p-4">
      <div className="md:max-w-[1100px] m-auto grid md:grid-cols-5 max-[768px]:md:grid-cols-6 gap-8 max-w-[400px]">
        <div className="col-span-1">
          <img src="" alt="logo-footer" className="h-[25px]" />
          <h3 className="font-bold text-ghost-white text-2xl mt-10">
            Contact us
          </h3>
          <h3 className="py-2 text-[#e4e4e4]">call: 647 68658 86658</h3>
          <h3 className="py-2 text-[#e4e4e4]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            officia .
          </h3>
          <h3 className="py-2 text-[#cecece]">Email: example@gmail.com</h3>

          <div className="flex gap-4 py-4">
            <div className="p-4 rounded-full bg-ghost-white text-gunmetal hover:text-harvest-gold hover:bg-gunmetal cursor-pointer">
              <Instagram size={25} />
            </div>
            <div className="p-4 rounded-full bg-ghost-white text-gunmetal hover:text-harvest-gold hover:bg-gunmetal cursor-pointer">
              <Twitter size={25} />
            </div>
            <div className="p-4 rounded-full bg-ghost-white text-gunmetal hover:text-harvest-gold hover:bg-gunmetal cursor-pointer">
              <LinkedIn size={25} />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold text-ghost-white text-2xl mt-10">Explore</h3>
          <ul className="py-3 text-[#e4e4e4]">
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Home
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              About us
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Resturant
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Contact us
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold text-ghost-white text-2xl mt-10">
            Categories
          </h3>
          <ul className="py-3 text-[#e4e4e4]">
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Breakfast
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Lunch
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Snacks
            </li>
            <li className="py-2 text-gray-400 hover:text-ghost-white cursor-pointer">
              Dinner
            </li>
          </ul>
        </div>

        <div className="col-span-2">
          <h3 className="font-bold text-ghost-white text-2xl mt-10">
            Subscribe
          </h3>
          <h3 className="py-2 text-[#e4e4e4]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            officia .
          </h3>
          <form className="input-box-shadow flex justify-content-between items-center bg-transparent gap-2">
            <input
              type="text"
              className="my-2 w-full rounded-md px-5 py-3 border border-solid border-ghost-white bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500"
              placeholder="Enter your email address here"
            />
            <button className="my-2 px-5 py-3 rounded-md bg-harvest-gold text-ghost-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Footer;
