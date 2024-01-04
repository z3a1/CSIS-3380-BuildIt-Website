import Card from "../JSX Components/buildcard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect,useState } from "react";
import "../css components/userbuildsection.css"
import { Link } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

const UserBuilds = () => {
    let[buildPosts,setBuildPosts] = useState([]);
    let[loading, isLoading] = useState(true);

    useEffect(() => {
        async function getBuildPosts() {
            await fetch("http://localhost:5000/api/getBuilds")
            .then(res => res.json())
            .then(data => {
                setBuildPosts(data)
            })
            isLoading(false)
        }
        getBuildPosts()
    },[])

    return ( 
    <div className = "User-Builds">
        <label className="Title-Label">User Submitted Builds</label>
        <div className = "Build-Card-List">
            {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
            {!loading &&  <>
                <Swiper spaceBetween={10} slidesPerView={3}>
                        {buildPosts.map((e,index) => {
                            return(
                                <SwiperSlide key = {index + Math.random()}>
                                        <Card data = {e} key = {index + Math.random()}/>
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
                <button className = "View-More-Builds-Btn"><Link to = "/CompletedBuilds" style = {{textDecoration: "none", color: "white"}}>View More</Link></button>
            </>}
        </div>
    </div>
     );
}
 
export default UserBuilds;