import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { doFetchgrower, doFetchProfile } from "../services/findgrowers-controller";

function GrowerCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{ backgroundColor: "cornsilk" }}>
            <Card style={{ float: 'left', width: "350px", height: "450px", marginLeft: "60px", marginRight: "10px", border: "2px solid black" }}>
                <div style={{ textAlign: 'center' }}>
                    <Card.Img variant="top" src={`http://localhost:2010/uploads/availproducts/${props.picpath}`} alt="Pic Missing" style={{ height: "250px" }} />
                    <Card.Body style={{ marginTop: "40px" }}>
                        <Card.Text>
                            <b> Category: </b> {props.category}
                        </Card.Text>
                        <Card.Text>
                            <b>  Items: </b> {props.item}
                        </Card.Text>
                        <Button variant="primary" onClick={() => { handleShow(); props.onClick(props); }}>Details</Button>
                    </Card.Body>
                </div>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Details</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.selectedGrower ? (
                        <table className="table">
                            <tbody>
                                <tr><th><b>Name: </b> <i>{props.selectedGrower.firstname}</i></th></tr>
                                <tr><th><b>Email: </b> <i>{props.selectedGrower.email}</i></th></tr>
                                <tr><th><b>Contact: </b><i> {props.selectedGrower.contact}</i></th></tr>
                                <tr><th><b>Address: </b><i> {props.selectedGrower.address}</i></th></tr>
                                <tr><th><b>City: </b> <i>{props.selectedGrower.city}</i></th></tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

function FindGrowers() {
    console.log("Rendered");
    const [obj, setObj] = useState({
        category: "",
        item: "",
        city: "",
    });
    const [res, setres] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedGrower, setSelectedGrower] = useState(null);


    function changeHandler(event) {
        const { name, value } = event.target;

        var products = {
            "Milk Products": ["Milk", "Butter", "Paneer", "ButterMilk", "Curd"],
            "Vegetables": ["Beans", "Carrot", "Cabbage", "Peas", "Potato", "Cucumber"],
            "Fruits": ["Apple", "Banana", "Mango", "Orange", "Tomato", "Grapes"],
            "Nuts": ["Almond", "Cashew", "Walnut", "Peanut", "Pistachio"],
            "Edible Oil": ["Mustard", "Sesame", "Olive", "Soyabean"]
        };

        if (name === "category") {
            setItems(products[value] || []);
            setres([]); // Clear previous results
            setObj((prevObj) => ({
                ...prevObj,
                category: value,
                item: ""
            }));
        } else {
            setres([]); // Clear previous results
            setObj((prevObj) => ({
                ...prevObj,
                [name]: value,
            }));
        }
    }

    const changeHandler2 = (e) => {
        setres([]); // Clear previous results
        setObj((prevObj) => ({
            ...prevObj,
            item: e.target.value
        }));
    };

    async function OnFind() {
        // console.log("Fetching growers:", obj);

        const serverData = await doFetchgrower({
            category: obj.category,
            item: obj.item,
            city: obj.city,
        });
        if (serverData.data.status === true) {
            if (serverData.data.resp.length === 0) {
                alert("No growers found"); // Display message for empty array
            } else {
                setres(serverData.data.resp);
            }
        }
    }

    async function fetchDetails(grower) {
        console.log("Fetching details for:", grower);

        const serverData = await doFetchProfile({
            firstname: grower.firstname || '',
            email: grower.email || '',
            contact: grower.contact || '',
            address: grower.address || '',
            city: grower.city || ''
        });

        if (serverData.data.status === true) {
            if (serverData.data.resp.length === 0) {
                alert("No Details found");
            } else {
                setSelectedGrower(serverData.data.resp[0]); // Store only one grower's details
            }
        }
    }


    function CardShow(objj) {
        return (
            <GrowerCard
                {...objj}
                key={objj.id}
                onClick={fetchDetails}
                selectedGrower={selectedGrower}
            />
        );
    }


    return (
        <div style={{ backgroundColor: "cornsilk" , paddingTop:"80px"  }}>
             <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                        <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                        <h1>G2C </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
            <div style={{ paddingTop: "20px", textAlign: 'center' }}>
                <h1>
                    <i>Find Growers</i>
                </h1>
            </div>
            <div className='w-full my-2'>
                <form className='w-full max-w-[800px] mx-auto p-4'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="category" className="block font-medium leading-6 text-gray-900">Categories</label>
                                    <div className="mt-2">
                                        <select id="category" name="category" required autoComplete="category" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={obj.category} onChange={changeHandler}>
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
                                    <label htmlFor="items" className="block font-medium leading-6 text-gray-900">Items</label>
                                    <div className="mt-2">
                                        <select id="item" name="item" required autoComplete="item" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={obj.item} onChange={changeHandler2}>
                                            <option value="">Select</option>
                                            {items.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="city" className="block text-lg font-medium leading-6 text-gray-900">City</label>
                                    <div className="mt-2">
                                        <input type="city" name="city" id="city" required autoComplete="given-item" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={obj.city} onChange={changeHandler} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={OnFind}>Find Growers</button>
                    </div>
                </form>
                {res.map((item, index) => CardShow(item, index))}
            </div>
        </div>
    );
}

export default FindGrowers;
