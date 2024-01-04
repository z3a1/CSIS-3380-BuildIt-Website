import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

const CategoryDropDownButton = (items) => {
    let objState = {Title : items.SortCategories[0], SortCategories : items.SortCategories, Topics : items.Topics}
    console.log(objState.Topics)
    return ( 
        <>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {items.SortCategories[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    {items.SortCategories.map((e,index) => {
                        return(
                                <Link to = {`/Forum/Sort/${e}`} state = {{Title : e,
                            SortCategories: items.SortCategories,
                            Topics : items.Topics}} style = {{textDecoration: "none", color: "white"}}>
                                    <li className="dropdown-item" key = {index}>
                                        {e}
                                    </li>
                                </Link>
                        )
                    })}
                </ul>
            </div>
        </>
     );
}
 
export default CategoryDropDownButton;