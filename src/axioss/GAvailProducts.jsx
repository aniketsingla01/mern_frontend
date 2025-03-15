import React, { useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { doAvail } from "../services/gavail-controller";

function GAvailProducts() {
  console.log("rendered");
  const [availproduct, setAvailProduct] = useState({
    email: "",
    category: "",
    categoryi: "",
    item: "",
    picpath: "",
  });

  const [picPrev, setPicPrev] = useState("");
  const [itemp, setitemp] = useState("");

  function doPrev(inpFile) {
    const { name } = inpFile;
    const [files] = inpFile.files;

    if (name === "picpath") {
      setPicPrev(URL.createObjectURL(files));
    }
  }

  function changeHandler(event) {
    const { name, value, type, files } = event.target;

    var milkproduct = ["Milk", "Butter", "Paneer", "ButterMilk", "Curd"];
    var vegproducts = ["Beans", "Carrot", "Cabbage", "Peas", "Potato", "Cucumber"];
    var fruitproducts = ["Apple", "Banana", "Mango", "Orange", "Tomato", "Grapes"];
    var nutproducts = ["Almond", "Cashew", "Walnut", "Peanut", "Pistachio"];
    var oilproducts = ["Mustard", "Sesame", "Olive", "Soyabean"];

    if (value == "Milk Products") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        categoryi: milkproduct,
      }));
    }
    else if (value == "Vegetables") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        categoryi: vegproducts,
      }));
    }
    else if (value == "Fruits") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        categoryi: fruitproducts,
      }));
    }
    else if (value == "Nuts") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        categoryi: nutproducts,
      }));
    }
    else if (value == "Edible Oil") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        categoryi: oilproducts,
      }));
    }

    if (type === "file") {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
      doPrev(event.target);
    } else {
      setAvailProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  }

  //============Updating Items=======================
  const changeHandler2 = (event) => {
    // alert(event.target.value);
    let x = itemp ? itemp + "," + event.target.value : event.target.value;
    setitemp(x);
}


  //form submit handler
  async function formSubmitHandler() {
    var formdata = new FormData();

    for (var prop in availproduct) {
      formdata.append(prop, availproduct[prop]);
    }

    // Append accumulated items directly
    formdata.append("item", itemp);

    const serverMsg = await doAvail(formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (serverMsg.data.status === true) {
      alert("Product Published Successfully");
    } else {
      alert("Something went wrong ", serverMsg.data.error);
    }
  }

  return (
    <div className="w-full my-2" style={{ backgroundColor: "cornsilk" , paddingTop:"60px"  }}>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                        <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                        <h1>G2C </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
        <div style={{ paddingTop: "20px", }}>
                <center>
                    <h1>
                        <i>
                            Avail Product
                        </i>
                    </h1>
                </center>
            </div>
      <form className="w-full max-w-[800px] mx-auto p-4 ">
        <div className="space-y-12">
          {/* Personal Information Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={availproduct.email}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    required
                    autoComplete="category"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={availproduct.category}
                    onChange={changeHandler}
                  >
                    <option value="">Select</option>
                    <option value="Milk Products">Milk Products</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Nuts">Nuts</option>
                    <option value="Edible Oil">Edible Oil</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="categoryi"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Item Categories
                </label>
                <div className="mt-2">
                  <select
                    id="categoryi"
                    name="categoryi"
                    required
                    autoComplete="categoryi"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={changeHandler2}
                  >
                    <option value="">Select</option>
                    <option value={availproduct.categoryi[0]}>{availproduct.categoryi[0]}</option>
                    <option value={availproduct.categoryi[1]}>{availproduct.categoryi[1]}</option>
                    <option value={availproduct.categoryi[2]}>{availproduct.categoryi[2]}</option>
                    <option value={availproduct.categoryi[3]}>{availproduct.categoryi[3]}</option>
                    <option value={availproduct.categoryi[4]}>{availproduct.categoryi[4]}</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="item"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Items of Selected Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="item"
                    id="item"
                    required
                    autoComplete="given-item"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={itemp}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <br />

            <div className="sm:col-span-3">
              <label
                htmlFor="photo"
                className="block text-2xl font-medium leading-6 text-gray-900"
              >
                Product Pic
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {picPrev ? (
                  <img
                    src={picPrev}
                    alt="profilepic"
                    className="h-40 w-45 rounded-full"
                  />
                ) : (
                  <svg
                    className="w-32 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <div
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <label>
                    <span>Upload Pic</span>
                    <input
                      name="picpath"
                      type="file"
                      className="sr-only"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={formSubmitHandler}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default GAvailProducts;
