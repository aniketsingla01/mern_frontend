import axios from 'axios';
import React, { useState } from 'react'
import { doLogin } from '../services/login-controller';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GrowerDashBoard from './GrowerDashBoard';
import ConsumerDashBoard from './ConsumerDashBoard';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function Login() {
    const navigate = useNavigate();

    console.log("rendered");
    const [obj, setObj] = useState({
        email: "",
        password: "",
    });

    function openSignup() {
        navigate("/Signup")
      }
    
    function openHome(){
        navigate("/")
    }

    function doUpd(event) {
        var { name, value } = event.target;
        setObj({ ...obj, [name]: value, });
    }

    //it was done in singup mvc backend 
    async function doOpenLogin() {
        console.log(obj);

        try {
            const serverMsg = await doLogin(obj);
            console.log(serverMsg);

            if (serverMsg.data.status === true) {
                alert("Login Successfully");
                localStorage.setItem("token", serverMsg.data.jtoken);
                console.log(serverMsg.data.jtoken);

                if (serverMsg.data.type === "Grower") {
                    navigate("/GrowerDashBoard");
                } else if (serverMsg.data.type === "Consumer") {
                    navigate("/ConsumerDashBoard");
                }
            } else {
                alert(serverMsg.data.msg + " " + serverMsg.data.err);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
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
                                <Button type="submit" onClick={openHome} style={{ padding: "10px", marginRight: "12px" }}>Home</Button>
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" style={{ padding: "10px", marginRight: "12px" }} onClick={openSignup}>SignUp</Button>
                            </Col>

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img style={{ width: "110px", height: "140px" }}
                        className="mx-auto h-10 w-auto"
                        src={require('../pics/login.png')}

                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
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
                        <div>
                            <button
                                type="button" onClick={doOpenLogin}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


