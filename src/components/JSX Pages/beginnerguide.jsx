import NavBar from "../JSX Components/navbar";
import "../css components/beginnersguide.css"
import { Link, useParams } from "react-router-dom";
import ManufacturerLinks from "../../API/manufacturerLinks";


const GuidePage = () => {
    //TODO: Connect Youtube API to each of the Components
    //Do not try to hardcode each component
     let {Username} = useParams();

    const PCParts = ["CPU", 
    "Motherboard", 
    "RAM", 
    "Power Supply", 
    "Computer Case", 
    "Cooling", 
    "Storage Device",
    "GPU",
    "Operating System"
    ]

    return (
        <>
        <NavBar/>
        <div className = "Beginner-Page-Guide-Wrapper">
            <h1 className = "Page-Title">Beginner Guide</h1>
            <div className = "Components-Container">
                <h4 className = "Guide-Label">The Components</h4>
                <hr className = "Decal-Bar"></hr>
                {PCParts.map((e,index) => {
                    return(<Link to = {`/BeginnerGuide/${Username}/${e}`} key = {index}><button className = "Button-El">{e}</button></Link>)
                })}
            </div>
            <div className = "Manufacturer-Container">
                <h4 className = "Guide-Label">Manufacturer Websites</h4>
                <hr className = "Decal-Bar"></hr>
                {ManufacturerLinks.map((e,index) => {
                    return(
                            <button className = "Button-El">
                                <a style = {{textDecoration: "none", color: "white"}} href = {e.Link} key = {index}>
                                    {e.Company}
                                </a>
                            </button>
                    )
                })}
            </div>
        </div>
        </>
     );
}
 
export default GuidePage;