import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function ConsumerDashBoard() {

    let navigate = useNavigate();
    function openProfile() {
        navigate("/cprofile")
    }

    function openGrowers() {
        navigate("/fgrowers")
    }

    function dologout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Navigate to home page and prevent going back
        navigate("/", { replace: true });

        // Force reload to clear any cached state
        window.location.reload();
    }

    return (
        <div style={{ backgroundColor: "cornsilk" }}>
            <center style={{ paddingTop: "50px", marginTop: "40px", color: "cadetblue" }}>
                <h1>
                    <b>
                        Consumer DashBoard
                    </b>
                </h1>
            </center>
            <CardGroup style={{ marginTop: "40px", marginBottom: "80px" }}>
                <Card style={{ marginLeft: "60px", marginRight: "20px", border: "2px solid black" }}>
                    <Card.Img variant="top" style={{ marginTop: "50px", marginLeft: "130px", width: "400px" }} src={require('../pics/cprofile.png')} />
                    <center>
                        <Card.Body style={{ marginTop: "100px", marginBottom: "30px" }}>
                            <Card.Title style={{ color: "cadetblue" }}>Profile Form</Card.Title>
                            <Button variant="primary" onClick={openProfile}>Profile</Button>
                        </Card.Body>
                    </center>
                </Card>
                <Card style={{ marginLeft: "20px", marginRight: "60px", border: "2px solid black" }}>
                    <Card.Img variant="top" style={{ marginTop: "50px", marginLeft: "130px", width: "400px", height: "400px" }} src={require('../pics/findmanager.jpg')} />
                    <center>
                        <Card.Body style={{ marginTop: "100px", marginBottom: "30px" }}>
                            <Card.Title style={{ color: "cadetblue" }}>Find Growers</Card.Title>
                            <Button variant="primary" onClick={openGrowers} >Search</Button>
                        </Card.Body>
                    </center>
                </Card>
            </CardGroup>

            <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>
                        <img style={{ float: 'left', marginRight: "20px", marginLeft: "20px", marginTop: "7px", width: "100px", height: "40px" }} src={require('../pics/g2c.png')} alt="G2C Logo" />
                        <h1>G2C </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Button type="submit" onClick={dologout} style={{ padding: "10px", marginLeft: "1250px" }}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}

export default ConsumerDashBoard;
