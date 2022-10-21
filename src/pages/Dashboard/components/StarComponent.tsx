import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { Escola } from '../../../types/Escola';

interface StarComponentProps {
    escola: Escola,
    ano: number
}
const StarComponents = ({ escola, ano }: StarComponentProps) => {


    return (
        <>

            <div className='Star'>
                <div><Rating readonly ratingValue={escola.generalMetrics ? escola.generalMetrics[ano + ""].mediaAvaliacao * 10 : 0} iconsCount={10} /* Available Props */ /></div><div><h4>{escola.nome} </h4></div>
            </div>

        </>

    )
}
export default StarComponents;