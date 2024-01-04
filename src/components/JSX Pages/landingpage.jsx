import "../css components/maincontent.css"
import TrendingTab from "./trendingtab";
import UserBuilds from "./userbuildsection";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainContent = () => {
    return ( 
        <div className = "wrapper">
            <UserBuilds/>
            <TrendingTab/>
        </div>
     );
}
 
export default MainContent;