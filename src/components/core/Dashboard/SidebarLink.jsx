import { setShowSideBar } from "../../../slices/sideBarSlice";
import { matchPath, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Icons from "react-icons/vsc";


const SidebarList = ({link}) => {
    
    let Icon;

    if(link.icon){
        Icon = Icons[link.icon];
    }
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    const matchRoute = (route) => {
        return matchPath(route,location.pathname);
    }

    return (
        <button
            className={`flex items-center gap-3 w-full px-2 md:px-5 py-2 ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 border-l-4 border-l-yellow-50" : " text-richblack-300"} 
                `}
            onClick={ () => {
                navigate(link.path)
                if(setShowSideBar){
                    dispatch(setShowSideBar(false))
                }
            }}    
        >
            {
                Icon && (
                    <Icon className="lg:text-lg"/>
                )
            }
            <p className="lg:text-base">{link.name}</p>
        </button>
    )
}

export default SidebarList