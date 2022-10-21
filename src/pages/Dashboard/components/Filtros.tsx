import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { Context } from "../../../context/Context";
import { BASE_URL } from "../../../services/api";
import { Cidade } from "../../../types/Cidade";
import { Escola } from "../../../types/Escola";
import { Filter } from "../../../types/Filters";
import { notNulltext } from "../../../util/ObjectUtil";
import './Filtros.scss'




const Filtros = () => {


    const series = [
        { value: 1, label: 'Primeira'},
        { value: 2, label: 'Segunda' },
        { value: 3, label: 'Terceira' },
        { value: 4, label: 'Quarta' }
    ];

    const anos= [
        { value: ['2022'], label: 'Ano Atual' },
        { value: ['2021','2022'], label: 'Ano Passado' },
        { value: ['2020','2021','2022'], label: 'Ultimos 3 anos' }
    ];

    const materias = [
        { value: 1, label: 'Português' },
        { value: 0, label: 'Matemática' },
    ];
    const [cidades, setCidades] = useState<Cidade[]>([] as Cidade[]);
    const [escolas, setEscolas] = useState<Escola[]>([] as Escola[]);
    const [citySelectedId, setCitySelectedId] = useState('');
    const [schoolsIds, setSchoolIds] = useState([] as Array<string>);
    const [materiasIds, setMateriasIds] = useState([] as Array<number>);
    const [serieSelecteds, setSerieSelected] = useState([] as Array<number>);
    const [anoSelected, setAnoSelected] = useState(['2022'] );
    const [filterByNota, setFilterByNota] = useState(true);
    const [filterByPresenca, setFilterByPresenca] = useState(false);
    const [filterByEvaluate, setFilterByEvaluate] = useState(false);
    const [canAply, setCanAply] = useState(false);
    const [filtersContext, setFilters] = useContext(Context);

    useEffect(() => {
        const fetchCityes = () => {
            axios.get(BASE_URL+'cidade')
            .then(function (response) {
              if (response.data){
                console.log(response.data);
                setCidades(response.data);
              }
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
            });
        }
        fetchCityes();
    },[]);


    useEffect(() => {
        const fetchEscolas = () => {
            axios.get(BASE_URL+'escola?cidadeId='+citySelectedId)
            .then(function (response) {
              if (response.data){
                console.log(response.data);
                setEscolas(response.data);
              }
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
            });
        }
        fetchEscolas();
    },[citySelectedId]);

    const handleSelectCity = (event: any, change: string) => {
        switch (change) {
            case "cityChange":
                setCitySelectedId(event.value)
                break;
            case "serieChange":
                setSerieSelected((serieSelecteds) => {
                    let localSerieSelecteds = { ...serieSelecteds }
                    localSerieSelecteds = event.map((e: { value: any; }) => e.value);
                    return localSerieSelecteds;
                })
                break;
            case "anoChange":
                setAnoSelected(event.value)
                break;
            case "escolaChange":
                setSchoolIds((escolas) => {
                    let localEscolas = { ...escolas }
                    localEscolas = event.map((e: { value: any; }) => e.value);
                    if(localEscolas.length > 0){
                        setCanAply(true);
                    }else setCanAply(false);
                    return localEscolas
                })
                break;
            case "materiaChange":
                setMateriasIds((materiasIds) => {
                    let localMaterias = { ...materiasIds }
                    localMaterias = event.map((e: { value: any; }) => e.value);
                    return localMaterias
                })
                break;
            default:
                break;
        }
    }
    const handleSelectExibir = (event: any, typeFilter: string) => {
        switch (typeFilter) {
            case "filterByNota":
                setFilterByNota((filterByNota ) => event.target.checked)
                setFilterByEvaluate(false);
                setFilterByPresenca(false);
                break;

            case "filterByEvaluate":
                setFilterByEvaluate((filterByEvaluate) =>  event.target.checked);
                setFilterByPresenca(false);
                setFilterByNota(false);
                break;

            case "filterByPresenca":
                setFilterByPresenca((filterByPresenca) => event.target.checked);
                setFilterByNota(false);
                setFilterByEvaluate(false);
                break;

            default:
                break;
        }
    }
    const handleApplyFilters = () => {
        setFilters((filters: Filter) => {
            let filtersLocal = {...filters};
            filtersLocal.escolaIds = schoolsIds;
            filtersLocal.anos = anoSelected;
            filtersLocal.escolas = escolas.filter(e => schoolsIds.includes(e.id));
            filtersLocal.seriesIds = serieSelecteds;
            filtersLocal.materiaCods = materiasIds;
            filtersLocal.exibirBy  = filterByNota ? 'mnota' : filterByPresenca? 'mpresenca' : filterByEvaluate? 'mavaliacao':'';
            filtersLocal.exibindo = filterByNota ? 'Notas' : filterByPresenca? 'Presenças' : filterByEvaluate? 'Avaliações':'';
            if(schoolsIds.length > 0 ){
                filtersLocal.mapString = escolas.filter(e => schoolsIds.includes(e.id)).map(e => e.nome + ", " + cidades.filter(c => c.id === citySelectedId )[0].nome + " - RJ").join(" | ");
            }
            return filtersLocal;
        })
    }

    return (
        <>
            <Container fluid className="filters">
                <Row>
                <div>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Selecione a cidade</Form.Label>
                                <ReactSelect
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "cityChange")}
                                    value={cidades.filter(c => c.id === citySelectedId).map(c =>{
                                        return {label: c.nome, value: c.id}
                                    } )[0]}
                                    name="color"
                                    options={cidades.map( c => {
                                        return {label: c.nome, value: c.id}
                                    })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col hidden={notNulltext(citySelectedId).length === 0}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Selecione as escolas</Form.Label>
                                <ReactSelect
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isMulti={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "escolaChange")}
                                    value={schoolsIds.length > 0 ? escolas.filter(f => schoolsIds.includes(f.id)).map( c => {
                                        return {label: c.nome, value: c.id}
                                    }) : undefined}
                                    name="color"
                                    options={escolas.map( c => {
                                        return {label: c.nome, value: c.id}
                                    })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    </div>
                    <div hidden={schoolsIds.length === 0}>
                    <Row>
                        <Col >
                            <Form.Group className="mb-3" >
                                <Form.Label>Escolha o período</Form.Label>
                                <ReactSelect
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    defaultValue={anos[0]}
                                    onChange={(event: any) => handleSelectCity(event, "anoChange")}
                                    value={anos.filter(f => f.value === anoSelected)[0]}
                                    name="color"
                                    options={anos} />
                            </Form.Group>
                        </Col>
                    </Row>
            
                    <Row>
                        <Col hidden={schoolsIds.length === 0}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Selecione a série</Form.Label>
                                <ReactSelect
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isMulti={true}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "serieChange")}
                                    value={series.filter(f => serieSelecteds.includes(f.value))}
                                    name="color"
                                    options={series} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col hidden={notNulltext(citySelectedId).length === 0}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Selecione as materias</Form.Label>
                                <ReactSelect
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isMulti={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "materiaChange")}
                                    value={materias.filter(f => materiasIds.includes(f.value))}
                                    name="color"
                                    options={materias} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            <span>Filtros</span>
                            <div className="exibir-por">
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Check id={'filter-score'}
                                                onClick={(event: any) => handleSelectExibir(event, 'filterByNota')}
                                                checked={filterByNota} name="groupRadio" type="radio" label="Exibir por nota." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Check id={'filter-presence'}
                                                onClick={(event: any) => handleSelectExibir(event, 'filterByPresenca')}
                                                checked={filterByPresenca} name="groupRadio" type="radio" label="Exibir por presença." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Check id={'filter-avaliacao'}
                                                onClick={(event: any) => handleSelectExibir(event, 'filterByEvaluate')}
                                                checked={filterByEvaluate} name="groupRadio" type="radio" label="Exibir por avaliação." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    </div>
                    <div>
                    <Row hidden={schoolsIds.length === 0} className="mb-3" style={{padding:'20px'}}>
                        <Button disabled={!canAply}  onClick={()=> {handleApplyFilters()}} className='btn-aplicar' variant="outline-secondary">Aplicar</Button>
                    </Row>
                    </div>
                </Row>
            </Container>
        </>

    )
}
export default Filtros;