import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

const TopicDropDownButton = (items) => {
    console.log(items)
    return ( 
        <>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {items.Topics[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    {items.Topics.map((e,index) => {
                        return(
                            <Link to = {`/Forum/Topic/${e.replace('/','')}`} 
                            state = {{Title: e, 
                                Topics: items.Topics,
                                SortCategories: items.SortCategories
                            }}
                            style = {{textDecoration: "none"}}
                            key = {index + 1}>
                                <li className = "dropdown-item" key = {index}>{e}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </>
     );
}
 
export default TopicDropDownButton;