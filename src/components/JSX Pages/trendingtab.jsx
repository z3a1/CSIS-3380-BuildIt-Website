import "../css components/trendingtab.css"
import { FaChartLine } from "react-icons/fa";
import PostCard from "../JSX Components/postcard";
import { useEffect, useState } from "react";
import { Link , useParams} from "react-router-dom";
import SortCategories from "../../API/sortCategories";
import { FallingLines } from "react-loader-spinner";

const TrendingTab = () => {

    let {Username} = useParams()

    const [posts,setPosts] = useState([]);
    const [loading,isLoading] = useState(true);
    let topicList = [];

    useEffect(() => {
        const getPosts = async () => {
            await fetch("http://localhost:5000/api/redditFeed")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            });
            isLoading(false)
        }

        getPosts()
    }, [])

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
    posts.map((e,index) => {
        topicList.push(e.link_flair_text)
    })
    let uniqueTopics = topicList.filter((v, i, a) => a.indexOf(v) === i);

    return ( 
        <div className = "Trend-Wrapper">
            <span className = "Trend-Label"><FaChartLine size = {50} className ="Trend-Icon"/> <h4 className = "Trend-Text">Trending</h4></span>

            <div className = "Popular-Posts">
                <h4 className = "Pop-Post-Label">Popular Posts</h4>
                <span className = "Button-Row">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {SortCategories[0]}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {SortCategories.map((e,index) => {
                                return(
                                        <Link to = {`/Forum/${Username}/Sort/${e}`} state = {{Title : e,
                                    SortCategories: SortCategories,
                                    Topics : uniqueTopics}} style = {{textDecoration: "none", color: "white"}}>
                                            <li className="dropdown-item" key = {index}>
                                                {e}
                                            </li>
                                        </Link>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {uniqueTopics[0]}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {uniqueTopics.map((e,index) => {
                                return(
                                    <Link to = {`/Forum/${Username}/Topic/${e.replace('/','')}`} 
                                    state = {{Title: e, 
                                        Topics: uniqueTopics,
                                        SortCategories: SortCategories
                                    }}
                                    style = {{textDecoration: "none"}}
                                    key = {index + 1}>
                                        <li className = "dropdown-item" key = {index}>{e}</li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                </span>
                <span className = "Post-List">
                    {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                    {posts.map((e,index) => {
                            if(isImage(e.url))
                                return(<PostCard HasImage = {false} img = {e.url} title = {e.title} id = {e.id} key = {index} votes = {e.ups}/>)
                            else
                                return(<PostCard HasImage = {true} title = {e.title} id = {e.id} key = {index} votes = {e.ups}/>)
                        })}
                </span>
            </div>
            <div className = "Popular-Topics">
                <h4 className = "Pop-Topics-Label">Popular Topics</h4>
                <div className = "Topic-List-Container">
                    <ul className = "Topic-List" style = {{listStyle: "none"}}>
                        {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                        {uniqueTopics.map((e,index) => {
                            if(e.includes('/'))
                                return(<Link to = {`/Forum/${Username}/Topic/${e.replace('/','')}`} state = {{Title: e , SortCategories : SortCategories, Topics : uniqueTopics}} key = {index} style = {{textDecoration: "none"}}><li style = {{listStyle: "none"}} key = {index}>#{e}</li></Link>)
                            else
                                return(<Link to = {`/Forum/${Username}/Topic/${e}`} state = {{Title: e , SortCategories : SortCategories, Topics: uniqueTopics}}key = {index} style = {{textDecoration: "none"}}><li style = {{listStyle: "none"}} key = {index}>#{e}</li></Link>)
                        })}
                    </ul>
                </div>
            </div>

        </div>
     );
}
 
export default TrendingTab