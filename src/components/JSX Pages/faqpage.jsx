import NavBar from "../JSX Components/navbar";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../css components/faqpage.css"
import { Blocks } from  'react-loader-spinner'
import { Container, Content } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import FAQPost from "../JSX Components/threadpost";

//TODO Work on uploading faq to DB

const FaqPage = () => {
    let[currentPosts,setPosts] = useState()
    let[loading,isLoading] = useState(true)
    useEffect(() => {
        let getPosts = async () => {
            await fetch("http://localhost:5000/api/getPosts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                isLoading(false)
            })
        }
        getPosts()
    },[])


    return ( 
        <>
            {loading && 
            <div className = "Loading-Symbol">
                <Blocks
            visible={true}
            height="500"
            width="500"
            ariaLabel="blocks-loading"
            wrapperStyle={{position : "relative " , top : "50%" , left : "50%" ,backgroundColor : "Black", alignText : "center"}}
            wrapperClass="Loading-Symbol"/>
            </div>}

            {!loading &&             
            <>
                <NavBar/>
                <div className = "Faq-Wrapper">
                    <h1 className = "Component-Label">
                        FAQ
                    </h1>
                    <Container className = "Thread-Posts-Wrapper">
                        <Content className = "Post-Wrapper">
                            {currentPosts.map((e,index) => {
                                return(
                                    <FAQPost content = {e} key = {index + Math.random()}/>
                                )
                            })}
                        </Content>
                    </Container>
                </div>
            </>}
        </>
     );
}
 
export default FaqPage;