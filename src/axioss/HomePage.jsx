import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './LogIn';
import SignUp from './SignUp';
import Col from 'react-bootstrap/Col';
import GrowerDashBoard from './GrowerDashBoard';
import ConsumerDashBoard from './ConsumerDashBoard';
import CProfile from './CProfile';
import FindGrowers from './FindGrowers';
import GProfile from './GProfile';
import GAvailProducts from './GAvailProducts';
import GItemsManager from './GItemsManager';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
// import Home from './Home';
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {

  let navigate = useNavigate();
  function openSignup() {
    navigate("/Signup")
  }

  function openLogin() {
    navigate("/Login")
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
                <Button type="submit" style={{ padding: "10px", marginRight: "12px" }} onClick={openSignup}>SignUp</Button>
              </Col>
              <Col xs="auto">
                <Button type="submit" onClick={openLogin} style={{ padding: "10px", marginRight: "12px" }}>Login</Button>
              </Col>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Carousel>
          <Carousel.Item >
            <img style={{ height: "500px" }} className="d-block w-100" src={require('../pics/1.jpg')} alt="First slide" />
          </Carousel.Item>

          <Carousel.Item >
            <img style={{ height: "500px" }} className="d-block w-100" src={require('../pics/2nd.jpg')} alt="Second slide" />
          </Carousel.Item>

          <Carousel.Item >
            <img style={{ height: "500px" }} className="d-block w-100" src={require('../pics/3.webp')} alt="Third slide" />
          </Carousel.Item>
        </Carousel>

        <div style={{ color: "White", backgroundColor: "darkslategrey",paddingTop:"8px",paddingBottom:"8px" }}>
          <center><h3><b>Our Services</b></h3></center>
        </div>
        <div>
          <CardGroup style={{paddingTop:"10px",paddingBottom:"20px"}}>
            <Card style={{ marginLeft: "60px", marginRight: "20px", border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/grower.jpg')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center> Grower </center></Card.Title>
                <Card.Text>The initiative connects farmers with consumers, reducing middlemen, ensuring fair pricing, and providing high-quality, locally sourced products, promoting sustainable agriculture, local economies, and healthier eating.</Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ marginRight: "20px", border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/consumer.jpg')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center> Consumer </center></Card.Title>
                <Card.Text>Consumers enjoy fresh, high-quality produce at competitive prices, fostering transparency, trust, and local agriculture. This model reduces supply chain inefficiencies and promotes sustainable practices.</Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/tc.jpeg')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center> Terms and Condition </center></Card.Title>
                <Card.Text>Growers must maintain product quality, ethical practices, and local regulations, while consumers agree to fair trade terms, timely payments, and amicable dispute resolution, with the platform not liable for losses.</Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ marginLeft: "20px", marginRight: "60px", border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/np.png')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center> Non Profitable </center></Card.Title>
                <Card.Text>Nonprofits in Grower-to-Consumer bridge farmers-consumers gap through education, marketing, and distribution, promoting sustainability, community engagement, and food security through direct farm-to-table connections.</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>

        <div style={{ color: "White", backgroundColor: "darkslategrey",paddingTop:"8px",paddingBottom:"8px" }}>
          <center><h3><b>About Us</b></h3></center>
        </div>
        <div>
          <CardGroup style={{paddingTop:"10px",paddingBottom:"20px"}}>
            <Card style={{ marginLeft: "60px", marginRight: "10px", border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/aniket.jpg')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center>Developed By</center></Card.Title>
                <Card.Text>
                  <center>
                    <div><b>Name:</b> <i> Aniket Singla </i></div>
                    <div><b>Email Id:</b> <i> aniketsingla2020@gmail.com </i></div>
                    <div><b>Address:</b> <i> Bathinda, Punjab </i></div>
                    <div><b>Contact:</b> <i> 90239-09060 </i></div>
                  </center>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ marginLeft: "10px", marginRight: "60px", border: "2px solid black" }}>
              <Card.Img variant="top" src={require('../pics/rajesh.png')} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title><center> Developed Under Guidance </center></Card.Title>
                <Card.Text>
                  <center>
                    <div><b>Name:</b> <i> Prof. Rajesh Bansal </i></div>
                    <div><b>Email Id:</b> <i> bce@gmail.com </i></div>
                    <div><b>Address:</b> <i> Om Complex Ajit Road Bathinda </i></div>
                    <div><b>Contact:</b> <i> 98722-46056 </i></div>
                  </center>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
        <div style={{ color: "White", backgroundColor: "darkslategrey",paddingTop:"8px",paddingBottom:"8px" }}>
          <center ><h3><b>Reach Us </b></h3></center>
        </div>
        <div style={{marginTop:"10px", marginBottom:"10px"}}>
          <center>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.8807340362623!2d74.9497531753517!3d30.211951274839677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732a4f07278a9%3A0x4a0d6293513f98ce!2sBanglore%20Computer%20Education!5e0!3m2!1sen!2sin!4v1740480872031!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "1px solid black" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl shadow-md"
            ></iframe>
          </center>
        </div>
        <div style={{ color: "White", backgroundColor: "darkslategrey" ,paddingTop:"8px",paddingBottom:"8px"}} >
          <center>
            <h3>
              <p>&copy; 2024 Copyright:  G2C </p>
            </h3>
          </center>
        </div>
      </div>
      <Routes>
        <Route path='/Signup' element={<SignUp></SignUp>}></Route>
        <Route path="/Login" element={<Login></Login>} ></Route>
        <Route path="/GrowerDashBoard" element={<GrowerDashBoard />} />
        <Route path="/ConsumerDashBoard" element={<ConsumerDashBoard />} />
        <Route path='/cprofile' element={<CProfile></CProfile>}></Route>
        <Route path='/fgrowers' element={<FindGrowers></FindGrowers>}></Route>
        <Route path='/gprofile' element={<GProfile></GProfile>}></Route>
        <Route path='/gavail' element={<GAvailProducts></GAvailProducts>}></Route>
        <Route path='/gitems' element={<GItemsManager></GItemsManager>}></Route>
      </Routes>
    </div>
  );
}

export default HomePage;
