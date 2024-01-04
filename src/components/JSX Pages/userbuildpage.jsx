import NavBar from "../JSX Components/navbar";
import { useEffect,useState } from "react";
import "../css components/userbuildpage.css"
import Card from "../JSX Components/buildcard";
import { FallingLines } from "react-loader-spinner";

const UserBuildPage = () => {
    let[buildPosts,setBuildPosts] = useState([]);
    let[loading,setLoading] = useState(true)

    useEffect(() => {
        async function getBuildPosts() {
            await fetch("http://localhost:5000/api/getBuilds")
            .then(res => res.json())
            .then(data => {
                setBuildPosts(data)
                setLoading(false)
            })
        }
        getBuildPosts()
    },[])

    return ( 
        <>
            <NavBar/>
            <h1 className = "Component-Label">Completed Builds</h1>
            <div className = "Build-Post-Display">
                {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                {!loading && buildPosts.map((e,index) => {
                    return(
                    <Card data = {e} key = {index + Math.random()}/>
                    )
                })}
            </div>
            {window.pageYOffset > 300 ? <button className = "Reset-Button" onClick = {() => window.scrollTo({top : 0 , behavior : "smooth"})}>Go Up ⬆️</button> : <></>}
        </>
     );
}
 
export default UserBuildPage;