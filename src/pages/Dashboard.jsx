import Sidebar from '../components/core/Dashboard/Sidebar';
import {useSelector} from 'react-redux';
import {Outlet} from "react-router-dom";
import useWindowSize from '../hooks/windowSize';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );
    const {showSideBar} = useSelector((state) => state.showSidebar);
    const windowSize = useWindowSize();


    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }


  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] bg-richblack-900 w-screen'>
        {
            windowSize.width < 770 && showSideBar && (
                <div className='w-[24%] md:w-[25%] lg:w-1/6'>
                    <Sidebar/>  
                </div>
            )
        }
        {
            windowSize.width > 770 && (
                <div className='w-[24%] md:w-[25%] lg:w-1/6'>
                    <Sidebar/>      
                </div>
            )
        }
        <div className='h-[calc(100vh-3.5rem)] overflow-y-auto w-full md:w-5/6'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard
