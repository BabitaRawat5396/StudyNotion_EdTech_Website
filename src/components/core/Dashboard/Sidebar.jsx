import { useDispatch, useSelector } from 'react-redux';
import {sidebarLinks} from '../../../data/dashboard-links';
import { VscSignOut } from "react-icons/vsc";
import { useState } from 'react';
import { logout } from "../../../services/operations/authAPI"
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import SidebarLink from './SidebarLink';
import { setShowSideBar } from '../../../slices/sideBarSlice';

const Sidebar = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector( (state) => state.profile);  
    const [confirmationModal, setConfirmationModal] = useState(null)


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
                <button
                    className=" px-2 md:px-5 py-2 text-sm font-medium text-richblack-300"
                    onClick={() =>
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                    }
                >
                    <div className="flex items-center gap-x-2"
                        onClick={() => {
                            dispatch(setShowSideBar(false))
                        }}>
                        <VscSignOut className="lg:text-lg" />
                        <p className='lg:text-base pl-1'>Logout</p>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}    
    </>
    )
}

export default Sidebar