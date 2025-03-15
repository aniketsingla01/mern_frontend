import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Routes, useNavigate } from 'react-router-dom';


function GrowerDashBoard() {

  let navigate = useNavigate();
  function openProfile() {
    navigate("/gprofile");

  }

  function openAvail() {
    navigate("/gavail");

  }

  function openItems() {
    navigate("/gitems");

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
            Grower DashBoard
          </b>
        </h1>
      </center>
      <CardGroup style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <Card style={{ marginLeft: "60px", marginRight: "10px", border: "2px solid black" }}>

          <Card.Img variant="top" src={require('../pics/gprofile.jpg')} />
          <center>
            <Card.Body>
              <Card.Title style={{ color: "cadetblue" }}>Profile Form</Card.Title>
              <Button variant="primary" onClick={openProfile}>Profile</Button>
            </Card.Body>
          </center>
        </Card>

        <Card style={{ marginLeft: "10px", marginRight: "10px", border: "2px solid black" }}>

          <Card.Img variant="top" style={{ marginLeft: "55px", marginTop: "30px", width: "350px" }} src={require('../pics/avail.png')} />
          <center>
            <Card.Body style={{ marginTop: "65px" }}>
              <Card.Title style={{ color: "cadetblue", }}>Avail Manager</Card.Title>
              <Button variant="primary" onClick={openAvail} >Avail</Button>


            </Card.Body>
          </center>
        </Card>

        <Card style={{ marginLeft: "10px", marginRight: "60px", border: "2px solid black" }}>

          <Card.Img variant="top" src={require('../pics/itemmanager.png')} />
          <center>
            <Card.Body>
              <Card.Title style={{ color: "cadetblue" }}>Items Manager</Card.Title>
              <Button variant="primary" onClick={openItems} >Items</Button>


            </Card.Body>
          </center> </Card>
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
              <Button type="submit" onClick={dologout} style={{ padding: "10px", marginLeft: "1270px" }}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
}

export default GrowerDashBoard;
