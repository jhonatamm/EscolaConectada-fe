import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import HomePage from "../pages/basepage";
import DashboardPage from '../pages/Dashboard/Dashboard';

const Routes = () => {
    return (<>
    <Router basename="/">
        <Switch>
            <Route path="/" element={<HomePage />} ></Route>
            <Route path="/dashboard" element={<DashboardPage />} ></Route>
        </Switch>
    </Router>
    </>)


}
export default Routes;