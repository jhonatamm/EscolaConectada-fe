import { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { Escola } from '../../../types/Escola';

interface StarComponentProps {
    escola: Escola,
    ano: number
}
const StarComponents = ({ escola, ano }: StarComponentProps) => {

    const [showMapLocation, setShowMapLocation] = useState(false);


    return (
        <>
            <Row>
                <div className='Star'>
                    <div><Rating readonly ratingValue={escola.generalMetrics ? escola.generalMetrics[ano + ""].mediaAvaliacao * 10 : 0} iconsCount={10} /* Available Props */ /></div>
                    <div className='display-map'><div><h4>{escola.nome} </h4></div><div> <Button variant="primary" size="sm" onClick={() => setShowMapLocation(!showMapLocation)}>{showMapLocation ? 'Esconder mapa': 'Ver localização'}</Button></div></div>
                </div>
            </Row>
            {showMapLocation ? 
            <Row className='display-map'>
                <div className='map-escola'>
                    <iframe width="100%" height="600" id="gmap_canvas" src={"https://maps.google.com/maps?width=80%25&height=400&hl=pt&q=" + escola.nome +' '+ escola.cidadeName + "&ie=UTF8&iwloc=B&output=embed"} scrolling="no" ></iframe>
                </div>
            </Row> : <></>}


        </>

    )
}
export default StarComponents;