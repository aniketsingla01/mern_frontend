import axios from 'axios';
import React, { useState } from 'react'
import { doSingup, doCheck } from '../services/signup-controller';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './LogIn';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function SignUp() {

    console.log("rendered");
    const [obj, setObj] = useState({
        email: "",
        password: "",
        type: ""
    });

    function doUpd(event) {
        var { name, value } = event.target;
        setObj({ ...obj, [name]: value, });

        if (name === "email") {
            checkEmailAvailability(value);
        }
    }

    async function checkEmailAvailability(email) {
        try {
            const response = await doCheck(email);      
            // axios.get(`http://localhost:2010/signup/check-email?email=${email}`);
            if (response.data.exists) {
                alert("Email is already in use! Please choose another.");
            }
        } catch (error) {
            console.error("Error checking email:", error);
        }
    }

    async function doSave() {
        /*
         const url=`http://localhost:2010/signup/save-profile`;
         console.log(obj);
         const serverMsg =await axios.post(url,obj);
         */

        console.log(serverMsg);
        var serverMsg = await doSingup(obj);

        if (serverMsg.data.status == true) {
            alert("Signup Successfully");
            navigate("/Login");
        }
        else {
            alert(serverMsg.data.msg + " " + serverMsg.data.err);
            navigate("/");
        }
    }

    let navigate = useNavigate();
    function openLogin() {
        navigate("/Login")
    }

    function openHome() {
        navigate("/")
    }

    return (
        < div style={{ backgroundColor: "cornsilk" }}>

            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                        <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                        <h1>G2C </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        </Nav>
                        <Form className="d-flex">
                            <Col xs="auto">
                                <Button type="submit" style={{ padding: "10px", marginRight: "12px" }} onClick={openHome}>Home</Button>
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" onClick={openLogin} style={{ padding: "10px", marginRight: "12px" }}>Login</Button>
                            </Col>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img style={{ width: "110px", height: "100px" }}
                        className="mx-auto h-10 w-auto"
                        src={require('../pics/signup.png')}

                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={obj.email}
                                    onChange={doUpd}
                                    onBlur={() => checkEmailAvailability(obj.email)}  // Only checks when user leaves input
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={obj.password}
                                    onChange={doUpd}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="type" className="block font-medium leading-6 text-gray-900">Type</label>
                            <div className="mt-2">
                                <select id="type" name="type" value={obj.type} onChange={doUpd} autoComplete="type" required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select</option>
                                    <option value="Grower">Grower</option>
                                    <option value="Consumer">Consumer</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button" onClick={doSave}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Already a user?{' '}
                        <a href="#" onClick={openLogin} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login 
                        </a>
                    </p> */}

                </div>
            </div>
            {/* <Routes>
                <Route path='/Login' element={<Login></Login>}></Route>
            </Routes> */}
        </div>
    )
}


