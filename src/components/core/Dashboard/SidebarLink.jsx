import * as Icons from "react-icons/vsc"
import { useNavigate } from "react-router-dom";
import { matchPath, useLocation } from 'react-router-dom';


const SidebarList = ({link}) => {
    const Icon = Icons[link.icon];
    const navigate = useNavigate();
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath(route,location.pathname);
    }

    return (
        <button
            className={`flex items-center gap-3 px-2 md:px-5 py-2 ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 border-l-4 border-l-yellow-50" : " text-richblack-300"} 
                `}
            onClick={ () => {navigate(link.path)}}    
        >
            <Icon className="lg:text-lg"/>
            <p className="lg:text-base">{link.name}</p>
        </button>
    )
}

export default SidebarList