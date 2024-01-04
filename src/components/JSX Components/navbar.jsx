import '../css components/navbar.css'
import {FaHome} from 'react-icons/fa'
import { GoGear } from "react-icons/go";
import BuildItLogo from "../../logos/BuildIt.png"
import { Link, useParams } from 'react-router-dom';


const NavBar = () => {
    let user = useParams()
    return (
        <div className= "NavBarDiv">
            <span className = "NavLink">
                <Link to = {`/MainPage/${user.Username}`} className="Logo-Link"><img src = {BuildItLogo} className = "NavLogo"/></Link>
                <Link to ={`/Forum/${user.Username}`} className="Link-Element">Forum</Link>
                <Link to ={`/CompletedBuilds/${user.Username}`} className="Link-Element">Completed Builds</Link>
                <Link to ={`/BeginnerGuide/${user.Username}`} className="Link-Element">Beginner Guide</Link>
                <Link to ={`/CustomerSupport/${user.Username}`} className="Link-Element">Customer Support</Link>
                <Link to = {`/FAQ/${user.Username}`} className="Link-Element">FAQ</Link>
            </span>
            <span className = "UserLinks">
                <div className = "Button-Group">
                    <Link to = {`/MainPage/${user.Username}`} className="Home-Link"><FaHome size = {50} className = "Home-Button"/></Link>
                    <Link to = {`/UserSettings/${user.Username}`} className = "Settings-Link"><GoGear size = {50} className = "Settings-Icon"/></Link>
                </div>
            </span>
        </div> 
     );
}
 
export default NavBar;