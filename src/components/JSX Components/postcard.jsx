import VotePost from "./votesection";
import "../css components/postcard.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link, useParams } from "react-router-dom";

const PostCard = (content) => {
    let {Username} = useParams();
    const noImgPost = (

            <div className="card w-75" style = {{margin: "20px", cursor: "pointer", marginLeft: "auto", marginRight: "auto",maxWidth: "75%"}}>
                <div className="card-body">
                    <Link style = {{textDecoration: "none", color: "black"}} 
            to = {`/Forum/${Username}/${content.title}`}
            state = {{TestContent: content}}
            >   
                        <h5 className="card-title">{content.title}</h5>
                    </Link>
                    <VotePost ups = {content.votes}/>
                </div>
            </div>
    )

    const ImgPost = (
                <div className="card mb-3" style = {{margin: "20px",cursor: "pointer", marginLeft: "auto", marginRight: "auto",maxWidth: "75%"}}>
                    <Link style = {{textDecoration: "none", color: "black"}} to = {`/Forum/${Username}/${content.title}`} state = {{TestContent: content}}>
                    <img className="card-img-top" id = "Post-Card-Img" alt = "Posted Picture" src = {content.img} style = {{width: "400px", height: "400px"}}/>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{content.title}</h5>
                        <VotePost ups = {content.votes}/>
                    </div>
                </div>
    )

    return ( 
        content.HasImage ? noImgPost : ImgPost
     );
}
 
export default PostCard