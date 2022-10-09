import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Col, Container, Navbar, Row, Form } from "react-bootstrap";
import Filtros from "./components/Filtros";
//stars
import { Rating } from 'react-simple-star-rating'
import { useState } from "react";
import "./Dashboard.scss"
import { IoIosSchool, IoIosGitNetwork } from 'react-icons/io';
import GraphLine from "./components/GraphLine";




export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
const DashboardPage = () => {

    const [rating, setRating] = useState(78);


    return (
        <>
            <Navbar bg="light">
                <Navbar.Brand href="#home"><IoIosSchool></IoIosSchool> Escola Conectada <IoIosGitNetwork></IoIosGitNetwork></Navbar.Brand>
            </Navbar>
            <Container fluid className="vh-100">

                <Row className='escola-dados'>
                    <Col sm={3} xxl={2} className='no-left-padding'> <Filtros></Filtros></Col>
                    <Col sm={9} xxl={10}>
                        <Row>
                            <Col>
                                    <GraphLine></GraphLine>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='Star'>
                                    <div><Rating readonly ratingValue={rating} iconsCount={10} /* Available Props */ /></div><div><h4>E. M. Olivio Bastos </h4></div>
                                    <div><Rating readonly ratingValue={77.7} iconsCount={10} /* Available Props */ /></div><div><h4>E. Mario Batista </h4></div>
                                    <div><Rating readonly ratingValue={44.7} iconsCount={10} /* Available Props */ /></div><div><h4>E. padre Mello </h4></div>
                                </div>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Navbar >
                                    <Row className="row-100">
                                        <Col className="rights">
                                            <div><span> Jhonatam Medina </span></div>
                                            <div><span>2022</span></div>
                                        </Col>
                                    </Row>
                                </Navbar>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default DashboardPage;
