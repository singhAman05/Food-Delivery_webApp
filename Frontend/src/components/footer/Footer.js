import React from "react";
import { Twitter, LinkedIn, Instagram } from "../../utils/icons/Icons";
import { useState } from "react";
import axios from "axios";
import { handleErrors, handleSuccess } from "../../utils/notifications/notify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Check if email is empty
    if (!email) {
      handleErrors("Please fill email");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      handleErrors("Please enter a valid email address!");
      return;
    }

    try {
      // Replace with your backend API URL
      const response = await axios.post(
        "http://localhost:5000/api/v1/addSubscriber",
        { email }
      );
      console.log(response);

      // Show success toast if request is successful
      if (response.status === 200) {
        handleSuccess(response);
        setEmail(""); // Clear the input
      }
    } catch (error) {
      // Show error toast if request fails
      handleErrors(error);
      console.error("Subscription error:", error);
    }
  };

  return (
    <section className="w-full bg-gunmetal py-14 p-4">
      <div className="md:max-w-[1100px] m-auto grid md:grid-cols-5 max-[768px]:md:grid-cols-6 gap-8 max-w-[400px]">
        <div className="col-span-1">
          <h3 className="font-bold text-ghost-white text-2xl mt-10">
            Contact Us
          </h3>
          <h3 className="py-2 text-[#e4e4e4]">Call us: +91 - 9599740329</h3>
          <h3 className="py-2 text-[#e4e4e4]">
            We're here to help! Contact us for any questions, support, or
            information about our services. Whether you need assistance or want
            to learn more, feel free to reach out.
          </h3>
          <h3 className="py-2 text-[#cecece]">Email: crave_info@gmail.com</h3>

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
            Get the latest discount coupons and offer updates directly to your
            inbox!
          </h3>
          <form
            className="input-box-shadow flex justify-between items-center bg-transparent gap-2"
            onSubmit={handleSubscribe}
          >
            <input
              type="text"
              className="my-2 w-full rounded-l-xl px-5 py-3 border border-solid border-ghost-white bg-transparent bg-clip-padding text-base font-normal text-ghost-white outline-none placeholder:text-neutral-500"
              placeholder="Enter your email address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="my-2 px-5 py-3 rounded-r-xl border border-solid border-harvest-gold bg-harvest-gold text-ghost-white"
            >
              Subscribe
            </button>
          </form>
          s
        </div>
      </div>
    </section>
  );
};

export default Footer;
