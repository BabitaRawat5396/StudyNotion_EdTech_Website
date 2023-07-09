import { useSelector } from "react-redux"
import CommonButton from "../../common/CommonButton";



const MyProfile = () => {

    const {user} = useSelector( (state) => state.profile);
    
    return (
        <div className="flex flex-col items-center py-10 gap-10 ">
            <h1 className=" text-3xl  text-richblack-5">My Profile</h1>

            {/* Name section */}
            <div className=" flex flex-col sm:flex-row text-sm sm:border sm:border-richblack-700 w-11/12 gap-6 sm:gap-0 sm:w-9/12 rounded-lg sm:bg-richblack-800 justify-between sm:p-8">
                <div className="flex gap-6 items-center rounded-lg border sm:border-0 border-richblack-700 bg-richblack-800 p-5 sm:p-0">
                    <img 
                        src={user?.imageUrl} 
                        alt={`${user.firstName} ${user.lastName} `} 
                        className="object-cover w-1/6 md:w-[60px] rounded-full aspect-square"/>
                    <div>
                        <p className="text-richblack-5 font-semibold text-lg">{user?.firstName+ " " + user?.lastName}</p>
                        <p className="text-richblack-300 text-sm">{user?.email}</p>
                    </div>
                </div>
                <div className="flex justify-end mr-4 sm:mr-0">
                    <CommonButton
                        linkto={"/dashboard/settings"}
                        // eslint-disable-next-line
                        customStyle={"bg-yellow-50 text-richblack-900"}
                        icon="MdEditDocument"
                    >
                        Edit
                    </CommonButton>
                </div>
                
            </div>

            {/* About Section */}
            <div className=" flex flex-col gap-4 sm:gap-0 sm:flex-row text-sm sm:border sm:border-richblack-700 w-11/12 sm:w-9/12 rounded-lg sm:bg-richblack-800 justify-between sm:p-8">
                <div className="flex flex-col gap-6 rounded-lg border sm:border-0 border-richblack-700 bg-richblack-800 p-5 sm:p-0">
                    <h1 className="text-richblack-5 font-semibold text-lg border-b py-1 md:py-0 md:border-b-0 border-richblack-700">About</h1>
                    <p className="text-richblack-600">
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                    </p>
                </div>
                <div className="flex justify-end mr-3 sm:mr-0">
                    <CommonButton
                        linkto={"/dashboard/settings"}
                        // eslint-disable-next-line
                        customStyle={"bg-yellow-50 text-richblack-900 "}
                        icon="MdEditDocument"
                    >
                        Edit
                    </CommonButton>
                </div>
                
            </div>
            
            {/* Additional Details Section */}
            <div className=" flex flex-col sm:flex-row gap-7 text-sm sm:border border-richblack-700 w-11/12 sm:w-9/12 rounded-lg sm:bg-richblack-800 justify-between sm:p-8"> 
                <div className="flex flex-col gap-6 border sm:border-0 border-richblack-700 rounded-lg bg-richblack-800 p-5 sm:p-0">
                    <h1 className=" text-richblack-5 font-semibold text-lg border-b py-1 md:py-0 md:border-b-0 border-richblack-700">Personal Details</h1>
                    <div className="grid grid-cols-1 grid-rows-6 md:grid-rows-3 md:grid-cols-2 text-richblack-600 text-sm gap-3 md:gap-10">
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">First Name</p>
                            <p>{user.firstName}</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">Last Name</p>
                            <p>{user.lastName}</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">Email</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">Phone Number</p>
                            <p>
                            {
                                user.additionalDetails.contactNumber ? 
                                (
                                    user.additionalDetails.contactNumber
                                ) :
                                (
                                    "NA"
                                )
                            }
                            </p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">Gender</p>
                            <p>
                            {
                                user.additionalDetails.gender ? 
                                (
                                    user.additionalDetails.gender
                                ) :
                                (
                                    "NA"
                                )
                            }
                            </p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 md:gap-0">
                            <p className=" text-richblack-5 w-1/3">Date Of Birth</p>
                            <p>
                            {
                                user.additionalDetails.dateOfBirth ? 
                                (
                                    user.additionalDetails.dateOfBirth
                                ) :
                                (
                                    "NA"
                                )
                            }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mr-3 sm:mr-0">
                    <CommonButton
                        linkto={"/dashboard/settings"}
                        // eslint-disable-next-line
                        customStyle={"bg-yellow-50 text-richblack-900 "}
                        icon="MdEditDocument"
                    >
                        Edit
                    </CommonButton>
                </div>
            </div>
        </div>
    )
}

export default MyProfile