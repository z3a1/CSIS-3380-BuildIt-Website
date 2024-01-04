import "../css components/small-post-card.css"
import VotePost from "./votesection";
import { Link, useParams } from "react-router-dom";

const Card = ({data}) => {
    let {Username} = useParams();
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
    if(isImage(data.url))
    {
        return ( 
            <div className="card" style={{width: "18rem"}}>
                <Link to = {`/CompletedBuilds/${Username}/${data.title}`} state = {{content : data}}>
                    <img className="card-img-top" src = {data.url_overridden_by_dest} width = "500" height = "200" alt="..."/>
                </Link>
                <div className="card-body">
                    <h5 className = "card-title">{data.author}</h5>
                    <p className="card-text">{data.title}</p>
                    <VotePost ups = {data.ups}/>
                </div>
            </div>
        );
    }
    else
    {
        return(<></>)
    }
}
 
export default Card;