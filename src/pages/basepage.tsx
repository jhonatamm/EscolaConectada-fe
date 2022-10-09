import { Link } from 'react-router-dom';

const HomePage = () => {


    return(
    <>
        <ul>
            <li>
              <Link to="/dashboard">Dashboard escolas</Link>
            </li>
            <li>
              <Link to="/sentiment">sentiment config</Link>
            </li>
          </ul>
          <div>
  </div>
    </>

)
}
export default HomePage;