import { Col, Container, Row } from 'react-bootstrap';
import Loading from 'react-loading';
import './LoadingComponent.scss'

interface LoadingComponentProps{
    texto:string,
    isLoading: boolean
}
const LoadingComponent = ({texto, isLoading}:LoadingComponentProps) => {


    return (
        <>
            <Container className='loading-container'>
                <Row>
                    <Col className='loading-spin'>
                        <div>{isLoading ? <Loading type={'spokes'} color={'#BF5079'} width={undefined} height={undefined}></Loading>: <></>}</div>
                        <div>{texto} </div>
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default LoadingComponent;