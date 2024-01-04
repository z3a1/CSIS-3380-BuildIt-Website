import {Routes, Route} from "react-router-dom"
import Home from "./JSX Pages/mainpage";
import CustomerSupport from "./JSX Pages/customersupport";
import GuidePage from "./JSX Pages/beginnerguide";
import ComponentGuide from "./JSX Pages/componentpage";
import PostPage from "./JSX Pages/postpage";
import ForumPage from "./JSX Pages/forumpage";
import ForumTab from "./JSX Pages/fourmtab";
import UserBuildPage from "./JSX Pages/userbuildpage";
import BuildPost from "./JSX Pages/userbuildpagepost";
import UserSettings from "./JSX Pages/usersettings";
import Login from "./JSX Pages/loginpage";
import RegisterPage from "./JSX Pages/registerpage";
import FaqPage from "./JSX Pages/faqpage";
import FaqPost from "./JSX Pages/faqpostpage";

const Connections = () => {
    return ( 
        <Routes>
            <Route path = "/" element = {<Login/>}></Route>
            <Route path = "/Register" element = {<RegisterPage/>}/>
            <Route path = "/MainPage/:Username"  element = {<Home/>}/>
            <Route path = "/Forum/:Username" element = {<ForumTab/>}/>
            <Route path = "/Forum/:Username/:title" element = {<PostPage/>}/>
            <Route path = "/Forum/:Username/Topic/:topic" element ={<ForumPage/>}/>
            <Route path = "/Forum/:Username/Sort/:Category" element = {<ForumPage/>}/>
            <Route path = "/CompletedBuilds/:Username" element = {<UserBuildPage/>}></Route>
            <Route path = "/CompletedBuilds/:Username/:title" element = {<BuildPost/>}/>
            <Route path = "/BeginnerGuide/:Username" element = {<GuidePage/>}/>
            <Route path = "/BeginnerGuide/:Username/:id" element = {<ComponentGuide/>}/>
            <Route path = "/CustomerSupport/:Username" element = {<CustomerSupport/>}></Route>
            <Route path = "/UserSettings/:Username" element = {<UserSettings/>}/>
            <Route path = "/FAQ/:Username" element = {<FaqPage/>}/>
            <Route path = "/FAQ/:Username/:Title" element = {<FaqPost/>}/>
        </Routes>
     );
}
 
export default Connections;