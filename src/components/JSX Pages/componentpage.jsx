import { useParams } from "react-router-dom";
import NavBar from "../JSX Components/navbar";
import "../css components/componentpage.css"
import { useEffect, useState } from "react";
import YouTube from 'react-youtube';

const ComponentGuide = () => {
    const param = useParams();
    const [video, setVideo] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const getVideo = async () => {
            let title = param.id
            await fetch(`http://localhost:5000/api/YouTubeFeed`,{
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({title: title}),
                headers: {'Content-Type' : 'application/json'},
            })
            .then(res => res.json())
            .then(
                data => {
                    console.log(data)
                    isLoading(false)
                    setVideo(data)
                }
            )
        }
        getVideo()
    },[]);

    // console.log(video[0].snippet.description)
    const videoOptions = {
        height: '500',
        width: '690',
        playerVars : {
            autoplay : 1
        },
    }

    return ( 
        <>
            <NavBar/>
            <div className = "Component-Page-Wrapper">
                <h1 className = "Component-Label">{param.id}</h1>
                <div className = "Component-Grid">
                    {loading && <h1 style = {{color: "white", textAlign: "center"}}>Loading...</h1>}
                    {!loading && <YouTube videoId={video[0].id.videoId} opts = {videoOptions} className = "Video"></YouTube>}
                </div>
            </div>
        </>
     );
}
 
export default ComponentGuide;