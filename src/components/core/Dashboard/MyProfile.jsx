import { useSelector } from "react-redux"
import CommonButton from "../../common/CommonButton";


const MyProfile = () => {
    
    const {user} = useSelector( (state) => state.profile);
    
    return (
        <div className="flex flex-col items-center py-10 gap-10 ">
            <h1 className=" text-3xl  text-richblack-5">My Profile</h1>

            {/* Name section */}
            <div className=" flex text-sm border border-richblack-700 w-9/12 rounded-lg bg-richblack-800 justify-between p-8">
                <div className="flex gap-6 items-center">
                    <img 
                        src={user?.imageUrl} 
                        alt={`${user.firstName} ${user.lastName} `} 
                        className="object-cover w-1/6 md:w-[60px] rounded-full aspect-square"/>
                    <div>
                        <p className="text-richblack-5 font-semibold text-lg">{user?.firstName+ " " + user?.lastName}</p>
                        <p className="text-richblack-300 text-sm">{user?.email}</p>
                    </div>
                </div>
                <div>
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

            {/* About Section */}
            <div className=" flex text-sm border border-richblack-700 w-9/12 rounded-lg bg-richblack-800 justify-between p-8">
                <div className="flex flex-col gap-5">
                    <h1 className="text-richblack-5 font-semibold text-lg">About</h1>
                    <p className="text-richblack-600">
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                    </p>
                </div>
                <div>
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
            <div className=" flex text-sm border border-richblack-700 w-9/12 rounded-lg bg-richblack-800 justify-between p-8"> 
                <div className="flex flex-col gap-6">
                    <h1 className=" text-richblack-5 font-semibold text-lg">Personal Details</h1>
                    <div className="grid grid-rows-3 grid-cols-2 text-richblack-600 text-sm gap-10">
                        <div>
                            <p className=" text-richblack-5">First Name</p>
                            <p>{user.firstName}</p>
                        </div>
                        <div>
                            <p className=" text-richblack-5">Last Name</p>
                            <p>{user.lastName}</p>
                        </div>
                        <div>
                            <p className=" text-richblack-5">Email</p>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <p className=" text-richblack-5">Phone Number</p>
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
                        <div>
                            <p className=" text-richblack-5">Gender</p>
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
                        <div>
                            <p className=" text-richblack-5">Date Of Birth</p>
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
                <div>
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