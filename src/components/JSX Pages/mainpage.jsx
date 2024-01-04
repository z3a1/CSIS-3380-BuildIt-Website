import "../css components/mainpage.css"
import NavBar from "../JSX Components/navbar";
import MainContent from './landingpage';
import { useParams } from "react-router-dom";

const Home = () => {
    let user = useParams();
    return ( 
        <div>
            <NavBar/>
            <div className="MainPageDiv">
                <MainContent/>
            </div>
        </div>
    );
}
 
export default Home;