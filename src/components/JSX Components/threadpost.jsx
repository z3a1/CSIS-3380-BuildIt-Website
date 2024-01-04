import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link, useParams } from 'react-router-dom';


const FAQPost = ({content}) => {
    let {Username} = useParams();
    return ( 
        <div className="card w-75" style = {{width: "100%"}}>
            <div className="card-body">
                <h5 className="card-title">{content.Title}</h5>
                <p className="card-text">By: {content.User}</p>
                <p className="card-text" style={{marginTop : "10px", marginBottom: "10px"}}>UpVotes : {content.Votes}</p>
                <Link to={`/FAQ/${Username}/${content.Title}`} state = {{content : content}}className="btn btn-primary" style = {{color : "white", textDecoration: "none"}}>Go To Post</Link>
            </div>
        </div>
     );
}
 
export default FAQPost;