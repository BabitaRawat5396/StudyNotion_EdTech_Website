import {sidebarLinks} from '../../../data/dashboard-links';
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
    
    const {user} = useSelector( (state) => state.profile);

    return (
    <>
        <div className=' whitespace-nowrap flex flex-col h-[calc[100vh-3.5rem)] mt-10 sm:mt-0 text-richblack-300 border h-full 
            bg-richblack-800 border-richblack-700'>
            <div className='h-10'></div>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link}/>
                        )
                    })
                }
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div className="flex flex-col">
                <SidebarLink
                    link={{ name: "Settings", path: "/dashboard/settings",icon: "VscSettingsGear" }}
                />
            </div>
        </div>
    </>
    )
}

export default Sidebar