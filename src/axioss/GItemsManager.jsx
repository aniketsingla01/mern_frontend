import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { doItemsDelete, doItemsFetch } from '../services/gitems-controller';
import { getLoggedInUserEmail } from '../services/auth-service';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function GItemsManager() {
    console.log("rendered");

    const [obj, setObj] = useState({
        email: "",
        _id: ""
    });

    useEffect(() => {
        const userEmail = getLoggedInUserEmail();
        console.log("Logged in user email:", userEmail);
        if (userEmail) {
            setObj(prev => ({ ...prev, email: userEmail }));
        } else {
            alert("Please log in to view your items");
        }
    }, []);


    const [res, setres] = useState([]);

    async function doDelete(rowObj) {
        const serverData = await doItemsDelete({ email: rowObj.email, _id: rowObj._id });
        if (serverData.data.status === true) {
            alert(JSON.stringify(serverData.data.msg));
            const updatedRes = res.filter(item => item._id !== rowObj._id);
            setres(updatedRes);
        } else {
            alert("Not Found");
        }
    }

    async function fetchItems() {
        console.log("Fetching items for email:", obj.email);
        try {
            const serverData = await doItemsFetch(obj);
            console.log("Server response:", serverData);
            if (serverData.data.status === true) {
                setres(serverData.data.resp);
            } else {
                alert("No items found");
            }
        } catch (error) {
            console.error("Error fetching items:", error);
            alert("Error fetching items. Please try again.");
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
            <div style={{ backgroundColor: "cornsilk", paddingTop:"60px" }}>

                <div className='w-full my-2'>

                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <center>
                                        <h1>Your Items</h1>
                                    </center>
                                </div>
                                <div style={{ marginLeft: "700px" }}>
                                    <center>
                                        <button type="button"
                                            className="rounded-md  bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={fetchItems}>
                                            Fetch Items
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                            <Table striped bordered hover style={{ margin: "auto" }}>

                                <thead>
                                    <tr>

                                        <th>
                                            <center>
                                                #
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                Email
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                Category
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                Item
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                Product Pic
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                Operations
                                            </center>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {res.map((objj, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{objj.email}</td>
                                            <td>{objj.category}</td>
                                            <td>{objj.item}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:2010/uploads/availproducts/${objj.picpath}`}
                                                    alt={"Image"}
                                                    width="200"
                                                    height="200"
                                                />
                                            </td>
                                            <td align="center">
                                                <Button variant="outline-primary" onClick={() => doDelete(objj)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GItemsManager;
