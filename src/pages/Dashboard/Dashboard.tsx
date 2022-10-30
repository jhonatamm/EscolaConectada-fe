import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Col, Container, Navbar, Row, Form } from "react-bootstrap";
import Filtros from "./components/Filtros";
//stars
import { Rating } from 'react-simple-star-rating'
import { createContext, useState } from "react";
import "./Dashboard.scss"
import { IoIosSchool, IoIosGitNetwork } from 'react-icons/io';
import GraphLine from "./components/GraphLine";
import { Filter } from "../../types/Filters";
import { Context } from "../../context/Context";
import StarComponents from "./components/StarComponent";
import { Escola } from "../../types/Escola";




export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

interface FilterContext {
    filters: Filter;
    setFilters: Function;
    setEscola: Function;
    escolas: Escola[]
}
const DashboardPage = () => {

    const [rating, setRating] = useState(78);
    const [filters, setFilters] = useState<Filter>({ escolaIds: [], anos: [], escolas: [], materiaCods: [], exibirBy: '', exibindo: 'Notas', seriesIds: [], mapString: '' } as Filter);
    const [escolas, setEscolasFilter] = useState<Escola[]>([] as Escola[]);

    return (
        <Context.Provider value={[filters, setFilters, escolas, setEscolasFilter]}>
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
                                    {filters.escolas.map(e => (
                                        <StarComponents key={e.id} escola={e} ano={2022}></StarComponents>
                                    ))}
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <Row >
                                <Col>
                                    {/* <Navbar >
                                        <Row className="row-100">
                                            <Col className="rights">
                                                <div><span> Jhonatam Medina </span></div>
                                                <div><span>2022</span></div>
                                            </Col>
                                        </Row>
                                    </Navbar> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        </Context.Provider>
    )
}

export default DashboardPage;
