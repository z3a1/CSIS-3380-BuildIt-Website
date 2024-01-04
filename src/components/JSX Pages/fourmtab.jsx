import NavBar from "../JSX Components/navbar";
import TrendingTab from "./trendingtab";
import "../css components/forumtab.css"
import "../css components/trendingtab.css"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SortCategories from "../../API/sortCategories";
import {AiFillFire} from "react-icons/ai";
import "../css components/forumpage.css"

const ForumTab = () => {

    let {Username} = useParams();

    let[TopicList,setCategoryList] = useState([]);
    let[NumOfTopicPosts,setNumOfPosts] = useState([]);

    useEffect(() => {
        let getCategories = async () => {
            await fetch("http://localhost:5000/api/getCategories")
            .then(res => res.json())
            .then(data => {
                let getTopics = [];
                data.map((e,index) => getTopics.push(e.link_flair_text))
                let uniqueTopics = getTopics.filter((v, i, a) => a.indexOf(v) === i);
                setCategoryList(uniqueTopics)
                let TopicArrayCount = [];
                uniqueTopics.map((TopicName,index) => {
                    let counter = 0;
                    data.map((e,index) => {
                        if(e.link_flair_text == TopicName)
                            counter += 1;
                    })
                    TopicArrayCount.push(counter)
                    setNumOfPosts(TopicArrayCount)
                })
            })
        }
        getCategories()
    },[])

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    return ( 
        <>
            <NavBar/>
            <h1 className = "Component-Label">Forums</h1>
            <div className = "Forum-Page-Wrapper">
                <div className = "Trending-Tab">
                    <TrendingTab className = "Trending-Section" key = {2}/>
                </div>
                <div className = "Category-Section">
                    <h3 style = {{textAlign: "center"}}>Categories</h3>
                    <hr/>
                    <table style = {{backgroundColor: "white",marginLeft: "20px",marginBottom:"20px", width: "95%"}}>
                        <tbody>
                            {
                                TopicList.map((e,index) => {
                                    return(
                                        <tr className = "Category-Table-Row">
                                            <td><p className = "Category-Color" style = {{backgroundColor : getRandomColor()}}></p></td>
                                            <td>
                                                <Link to = {`/Forum/${Username}/Topic/${e.replace('/','')}`} 
                                                state = {{Title : e, SortCategories : SortCategories , Topics : TopicList}} key = {index} style = {{textDecoration: "none"}}>
                                                        <li style = {{listStyle: "none", color: "black",display: ""}} key = {index}>#{e}</li>
                                                </Link>
                                            </td>
                                            <td style = {{marginLeft: "10px"}}>
                                                <Link to = {`/Forum/${Username}/Topic/${e.replace('/','')}`} 
                                                state = {{Title : e, SortCategories : SortCategories , Topics : TopicList}} key = {index} style = {{textDecoration: "none", color: "black"}}>
                                                    <AiFillFire/>
                                                    {NumOfTopicPosts[index]}
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {window.pageYOffset > 300 ? <button className = "Reset-Button" onClick = {() => window.scrollTo({top : 0 , behavior : "smooth"})}>Go Up ⬆️</button> : <></>}
        </>
     );
}
 
export default ForumTab;