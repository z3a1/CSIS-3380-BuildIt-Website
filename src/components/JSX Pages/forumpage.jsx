import PostCard from "../JSX Components/postcard";
import NavBar from "../JSX Components/navbar"
import { useEffect, useState } from "react";
import { useLocation, useParams} from "react-router-dom";
import "../css components/forumpage.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';
import { FallingLines } from "react-loader-spinner";


const ForumPage = () => {
    let {Username} = useParams();
    let testValue = useLocation().state;
    const [posts,setPosts] = useState([]);
    const [loading,isLoading] = useState(true);
    const [currentCat,setCategory] = useState(testValue.Title)

    let ForumStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        width: "600px"
    }
    useEffect(() => {
        const getFilteredPosts = async () => {
            if(testValue.Topics.includes(testValue.Title))
            {
                await fetch("http://localhost:5000/api/redditFeed")
                .then(res => res.json())
                .then(data => {
                    let filteredPosts = [];
                    if(testValue.Title != undefined)
                    {
                        if(currentCat.includes('/'))
                        {
                            filteredPosts = data.filter((e,index) => e.link_flair_text == testValue.Title)
                            setPosts(filteredPosts)
                        }
                        else
                        {
                            filteredPosts = data.filter((e,index) => e.link_flair_text == testValue.Title)
                            setPosts(filteredPosts)
                        }
                    }
                    else
                    {
                        filteredPosts = data.filter((e,index) => e.link_flair_text == "Hot")
                        setPosts(filteredPosts)
                    }
                    isLoading(false)
                })
            }
            else
            {
                await fetch('http://localhost:5000/api/redditFeed/getCategory', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({title: testValue.Title}),
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(res => res.json())
                .then(data => {
                    setPosts(data)
                    isLoading(false)
                })
            }
        }
        getFilteredPosts()
    },[loading])
    let changePosts = (event) => {
        setCategory(event)
        isLoading(true)
    }
    function isImage(url) {return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);}
    function getPosts(name)
    {
        let filteredPosts = posts.filter((e,index) => e.title.includes(name))
        setPosts(filteredPosts)
    }
    function resetPosts(){isLoading(true)}

    return ( 
        <>
            <NavBar/>
            <div className = "Forum-Container">
                <h1 className = "Component-Label">{testValue.Title}</h1>
                <div className = "Search-Form-Container">
                    <form className = "Search-Form">
                        <input type="text" className = "Search-Box" placeholder="Search For Text" onBlur={e => getPosts(e.target.value)} onFocus = {resetPosts}></input>
                    </form>
                </div>
                <div className = "Sort-Buttons">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {testValue.SortCategories[0]}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {testValue.SortCategories.map((e,index) => {
                                return(
                                        <Link to = {`/Forum/${Username}/Sort/${e}`} state = {{Title : e,
                                    SortCategories: testValue.SortCategories,
                                    Topics : testValue.Topics}} style = {{textDecoration: "none", color: "white"}}>
                                            <button className="dropdown-item" key = {index + Math.random()} onClick = {() => changePosts(e)}>
                                                {e}
                                            </button>
                                        </Link>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {testValue.Topics[0]}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {testValue.Topics.map((e,index) => {
                                return(
                                        <Link to = {`/Forum/${Username}/Sort/${e.replace('/','')}`} state = {{Title : e,
                                    SortCategories: testValue.SortCategories,
                                    Topics : testValue.Topics}} style = {{textDecoration: "none", color: "white"}}>
                                            <li className="dropdown-item" key = {index + Math.random()} onClick = {() => changePosts(e)}>
                                                {e}
                                            </li>
                                        </Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className = "Forum-Posts-Lists" style = {ForumStyle}>
                {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                {!loading &&
                    posts.map((e,index) => {
                    if(isImage(e.url))
                        return(<PostCard HasImage = {false} img = {e.url} title = {e.title} id = {e.id} key = {index} votes = {e.ups}/>)
                    else
                        return(<PostCard HasImage = {true} title = {e.title} id = {e.id} key = {index} votes = {e.ups}/>)
                    })
                }
                </div>
                {window.pageYOffset > 300 ? <button className = "Reset-Button" onClick = {() => window.scrollTo({top : 0 , behavior : "smooth"})}>Go Up ⬆️</button> : <></>}
            </div>
        </>
     );
}
 
export default ForumPage;