import axios from 'axios';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { doFetchProfile, doFetchProfileandValidateToken, doSaveProfile, doUpdateProfile } from '../services/gprofile-controller';

function GProfile() {
    console.log("rendered");
    const [profileData, setProfileData] = useState({
        email: "", firstname: "", lastname: "", address: "",
        town: "", city: "", state: "", categories: "", contact: "",
        adhaar: "", idproof: ""
    });

    const [idPrev, setIdPrev] = useState(null);

    function doPrev(inpFile) {

        const { name } = inpFile;
        const [files] = inpFile.files;

        if (name === "idproof") {
            // console.log(files);
            setIdPrev(files.name);
        }
    }

    //profile object update handler
    function changeHandler(e) {
        const { name, value, type, files } = e.target;
        // console.log(name, value, type, files, checked);

        if (type === "file") {
            setProfileData({ ...profileData, [name]: files[0] });
            doPrev(e.target);
        }

        else {
            setProfileData({ ...profileData, [name]: value })
        }

    }

    //form submit handler
    async function formSubmitHandler() {
        //   let url = "http://localhost:2010/gprofile/create-profile";

        var formdata = new FormData();
        for (var prop in profileData) {
            formdata.append(prop, profileData[prop]);
        }
        const serverMsg = await doSaveProfile(formdata, { headers: { 'Content-Type': 'multiport/form-data' } });
        console.log(serverMsg);

        if (serverMsg.data.status == true) {
            alert("Profile Created Successfully");
        }
        else {
            alert("Something went wrong ", serverMsg.data.error);
        }
    }

    //fetching the profile data from the backend
    async function fetchProfileData() {

        //  const url = `http://localhost:2010/gprofile/fetch-profile?email=${profileData.email}`;

        const serverData = await doFetchProfileandValidateToken(profileData.email);

        if (serverData.data.status == true) {
            alert(JSON.stringify(serverData));
            if (serverData.data.obj) {
                setProfileData(serverData.data.obj);
                setIdPrev(serverData.data.obj.idproof ? serverData.data.obj.idproof.split(".com-").at(-1) : null);
            } else {
                // Prevent blurring and allow filling data
                alert("No data fetched for the profile.");
            }
        } else {
            alert(serverData.data.message);
        }
    }

    //update form update handler
    async function formUpdateHandler() {

        console.log(profileData);

        var formData = new FormData();
        for (var key in profileData) {
            formData.append(key, profileData[key]);
        }

        //sending the formData to the backend
        // let url = "http://localhost:2010/gprofile/update-profile";

        const serverMsg = await doUpdateProfile(formData, { headers: { 'Content-Type': "multipart/form-data" } });
        console.log(serverMsg);

        if (serverMsg.data.status == true) {
            alert("Profile Updated Successfully");
        }
        else {
            alert("Something went wrong ", serverMsg.data.error);
        }
    }

    return (
        <>
        
        <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                    <Container fluid>
                        <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                            <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                            <h1>G2C </h1>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Container>
                </Navbar>

            <div className='w-full my-2' style={{ backgroundColor: "cornsilk", paddingTop:"80px"  }}>

                <div>
                    <center>
                        <h1>
                            <i>
                                Profile Form
                            </i>
                        </h1>
                    </center>
                </div>
                <form className='w-full max-w-[800px] mx-auto p-4 '>
                    <div className="space-y-12">

                        {/* Personal Information Section */}
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" required autoComplete="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.email} onBlur={fetchProfileData} onChange={changeHandler} />




                                    </div>
                                </div>
                                {/* <div className="mt-7">
                                <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={fetchProfileData}>Fetch</button>

                            </div> */}


                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-lg font-medium leading-6 text-gray-900">First name</label>
                                    <div className="mt-2">
                                        <input type="text" name="firstname" id="first-name" required autoComplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.firstname} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-lg font-medium leading-6 text-gray-900">Last name</label>
                                    <div className="mt-2">
                                        <input type="text" name="lastname" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.lastname} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="address" className="block text-lg font-medium leading-6 text-gray-900">Address</label>
                                    <div className="mt-2">
                                        <input type="text" name="address" id="address" required autoComplete="street-address" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.address} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="town" className="block font-medium leading-6 text-gray-900">Town / Village</label>
                                    <div className="mt-2">
                                        <input type="text" name="town" id="town" required autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.town} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block font-medium leading-6 text-gray-900">City</label>
                                    <div className="mt-2">
                                        <input type="text" name="city" id="city" required autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.city} onChange={changeHandler} />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="state" className="block font-medium leading-6 text-gray-900">State / Province</label>
                                    <div className="mt-2">
                                        <select id="state" name="state" required autoComplete="state-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={profileData.state} onChange={changeHandler}>
                                            <option value="">Select</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="sm:col-span-3">
                                    <label htmlFor="categories" className="block font-medium leading-6 text-gray-900">Categories</label>
                                    <div className="mt-2">
                                        <select id="categories" name="categories" required autoComplete="categories" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={profileData.categories} onChange={changeHandler}>
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
                                    <label htmlFor="contact" className="block text-lg font-medium leading-6 text-gray-900">Contact</label>
                                    <div className="mt-2">
                                        <input id="contact" name="contact" type="text" required autoComplete="contact" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.contact} onChange={changeHandler} />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Proof Picture Upload Section */}
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">

                                <div className="">
                                    <label htmlFor="Adhaar Number" className="block text-lg font-medium leading-6 text-gray-900">Adhaar Number</label>
                                    <div className="mt-2">
                                        <input id="adhaar" name="adhaar" type="text" required autoComplete="contact" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={profileData.adhaar} onChange={changeHandler} />
                                    </div>

                                </div>

                                <div className="">
                                    <label htmlFor="cover-photo" className="block text-2xl font-medium leading-6 text-gray-900">Aadhar Card </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                {
                                                    idPrev && <p className="mt-1 text-sm text-gray-500">{idPrev}</p>
                                                }
                                            </div>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" required name="idproof" type="file" className="sr-only" onChange={changeHandler} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={formSubmitHandler}>Save</button>

                        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={formUpdateHandler}>Update</button>
                    </div>
                </form>
            </div>
        </>
        )
}

export default GProfile;
