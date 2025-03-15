import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { doFetchCProfileandValidateToken, doSaveProfile, doUpdateCProfile } from '../services/cprofile-controller';

function CProfile() {
    console.log("rendered");
    const [cprofileData, setCProfileData] = useState({
        email: "", firstname: "", lastname: "", address: "",
        city: "", state: "", contact: "",
        adhaar: "", idproof: ""
    });

    const [idPrev, setIdPrev] = useState(null);

    function doPrev(inpFile) {
        const { name } = inpFile;
        const [files] = inpFile.files;

        if (name === "idproof") {
            setIdPrev(URL.createObjectURL(files));
        }
    }
    function changeHandler(e) {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setCProfileData({ ...cprofileData, [name]: files[0] });
            doPrev(e.target);
        } else {
            setCProfileData({ ...cprofileData, [name]: value });
        }
    }

    async function formFetchHandler() {
        const serverData = await doFetchCProfileandValidateToken(cprofileData.email);

        if (serverData.data.status == true) {
            if (serverData.data.obj) {
                setCProfileData(serverData.data.obj);
                // Construct the complete URL for idproof
                const baseUrl = "http://localhost:2010/uploads/cproof/"; // Base URL for images
                setIdPrev(serverData.data.obj.idproof ? baseUrl + serverData.data.obj.idproof : null);
            } else {
                alert("No data fetched for the profile.");
            }
        } else {
            alert(serverData.data.message);
        }
    }

    async function formUpdateHandler() {
        console.log(cprofileData);

        var formdata = new FormData();
        for (var key in cprofileData) {
            formdata.append(key, cprofileData[key]);
        }

        const serverMsg = await doUpdateCProfile(formdata, { headers: { 'Content-Type': "multipart/form-data" } });
        console.log(serverMsg);

        if (serverMsg.data.status == true) {
            alert("Profile Updated Successfully");
        } else {
            alert("Something went wrong ", serverMsg.data.error);
        }
    }

    async function formSubmitHandler() {
        var formdata = new FormData();
        for (var prop in cprofileData) {
            formdata.append(prop, cprofileData[prop]);
        }
        const serverMsg = await doSaveProfile(formdata, { headers: { 'Content-Type': 'multiport/form-data' } });
        console.log(serverMsg);
        if (serverMsg.data.status == true) {
            alert("Profile Created Successfully");
        } else {
            alert("Something went wrong ", serverMsg.data.error);
        }
    }

    return (
        <div style={{ backgroundColor: "cornsilk" , paddingTop:"100px"  }}>
             <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                        <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                        <h1>G2C </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
            <div >
                <center>
                    <h1>
                        <i>
                            Profile Form
                        </i>
                    </h1>
                </center>
            </div>
            <div className='w-full my-2'>
                <form className='w-full max-w-[800px] mx-auto p-4 '>
                    <div className="space-y-12">
                        {/* Personal Information Section */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" required autoComplete="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.email} onClick={formFetchHandler} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-lg font-medium leading-6 text-gray-900">First name</label>
                                    <div className="mt-2">
                                        <input type="text" name="firstname" id="first-name" required autoComplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.firstname} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-lg font-medium leading-6 text-gray-900">Last name</label>
                                    <div className="mt-2">
                                        <input type="text" name="lastname" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.lastname} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="address" className="block text-lg font-medium leading-6 text-gray-900">Address</label>
                                    <div className="mt-2">
                                        <input type="text" name="address" id="address" required autoComplete="street-address" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.address} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block font-medium leading-6 text-gray-900">City</label>
                                    <div className="mt-2">
                                        <input type="text" name="city" id="city" required autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.city} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="state" className="block font-medium leading-6 text-gray-900">State / Province</label>
                                    <div className="mt-2">
                                        <select id="state" name="state" required autoComplete="state-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={cprofileData.state} onChange={changeHandler}>
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
                                    <label htmlFor="contact" className="block text-lg font-medium leading-6 text-gray-900">Contact</label>
                                    <div className="mt-2">
                                        <input id="contact" name="contact" type="text" required autoComplete="contact" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.contact} onChange={changeHandler} />
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
                                        <input id="adhaar" name="adhaar" type="text" required autoComplete="contact" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cprofileData.adhaar} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="photo"
                                        className="block text-2xl font-medium leading-6 text-gray-900"
                                    >
                                        Adhaar Pic
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <div
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <label>
                                                <span>Upload Pic</span>
                                                <input
                                                    name="idproof"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={changeHandler}
                                                />
                                            </label>
                                        </div>
                                        {idPrev ? (
                                            <img
                                                src={idPrev}
                                                alt="Pic Missing"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={formSubmitHandler} >Save</button>
                        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={formUpdateHandler}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CProfile;
