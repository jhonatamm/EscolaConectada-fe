import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { notNulltext } from "../../../util/ObjectUtil";
import './Filtros.scss'




const Filtros = () => {
    const cidades = [
        { value: '00001', label: 'Campos dos goytacazes'  },
        { value: '00002', label: 'Bom Jesus do Itabapoana'  }
    ];

    const escolas = [
        { value: '0000', label: 'Escola estadual padre mello',},
        { value: '111', label: 'Escola municipal' },
        { value: '222', label: 'Escola dao fernandes' },
        { value: '333', label: 'Escola sao jose' },
        { value: '555', label: 'Escola maria clara' }
    ];

    const series = [
        { value: '0001', label: 'Geral' },
        { value: '0000', label: 'primeira'},
        { value: '111', label: 'segunda' },
        { value: '222', label: 'terceira' },
        { value: '333', label: 'quarta' }
    ];

    const anos= [
        { value: '2022', label: 'Ano Atual' },
        { value: '2021', label: 'Ano Passado' },
        { value: '2020', label: 'Ultimos 3 anos' }
    ];

    const materias = [
        { value: 0, label: 'Portugues' },
        { value: 1, label: 'Matematica' },
    ];

    const [citySelectedId, setCitySelectedId] = useState('');
    const [schoolsIds, setSchoolIds] = useState([] as Array<string>);
    const [materiasIds, setMateriasIds] = useState([] as Array<number>);
    const [serieSelected, setSerieSelected] = useState('0001');
    const [anoSelected, setAnoSelected] = useState('2022');
    const [filterByNota, setFilterByNota] = useState(true);
    const [filterByPresenca, setFilterByPresenca] = useState(false);
    const [filterByEvaluate, setFilterByEvaluate] = useState(false);

    const handleSelectCity = (event: any, change: string) => {
        switch (change) {
            case "cityChange":
                setCitySelectedId(event.value)
                break;
            case "serieChange":
                setSerieSelected(event.value)
                break;
            case "anoChange":
                setAnoSelected(event.value)
                break;
            case "escolaChange":
                setSchoolIds((escolas) => {
                    let localEscolas = { ...escolas }
                    localEscolas = event.map((e: { value: any; }) => e.value);
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
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "cityChange")}
                                    value={cidades.filter(f => f.value === citySelectedId)[0]}
                                    name="color"
                                    options={cidades} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col hidden={notNulltext(citySelectedId).length === 0}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Selecione as escolas</Form.Label>
                                <ReactSelect
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isMulti={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "escolaChange")}
                                    value={schoolsIds.length > 0 ? escolas.filter(f => schoolsIds.includes(f.value)) : undefined}
                                    name="color"
                                    options={escolas} />
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
                                    isSearchable={true}
                                    onChange={(event: any) => handleSelectCity(event, "serieChange")}
                                    value={series.filter(f => f.value === serieSelected)[0]}
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
                                                onChange={(event: any) => setFilterByNota((filterByNota ) => event.target.checked)}
                                                checked={filterByNota} name="groupRadio" type="radio" label="Exibir por nota." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Check id={'filter-presence'}
                                                onChange={(event: any) => setFilterByPresenca((filterByPresenca) => event.target.checked)}
                                                checked={filterByPresenca} name="groupRadio" type="radio" label="Exibir por presença." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Check id={'filter-avaliacao'}
                                                onChange={(event: any) => setFilterByEvaluate((filterByEvaluate) =>  event.target.checked)}
                                                checked={filterByEvaluate} name="groupRadio" type="radio" label="Exibir por avaliação." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    </div>
                    <div>
                    <Row className="mb-3" style={{padding:'20px'}}>
                        <Button  variant="secondary">Aplicar</Button>
                    </Row>
                    </div>
                </Row>
            </Container>
        </>

    )
}
export default Filtros;