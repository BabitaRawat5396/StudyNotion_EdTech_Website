import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {FiUpload} from 'react-icons/fi'
import {GiCrossMark} from 'react-icons/gi';
import { updateProfilePicture } from "../../../../services/operations/settingsAPI";


const UpdateProfilePicture = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);

    const [previewSource,setPreviewSource] = useState(null);
    const [uploadPopUp, setUploadPopUp] = useState(false);
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(null);

    const dispatch = useDispatch();
    let image =null;

    if(!user.imageUrl){
        image=`http://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        // console.log(file)
        if (file) {
            setFile(file)
            previewFile(file)
        }
    };

    // Reading file content using it to give the preview and then uploading it to the database
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // once file is read setting the DataUrl inside state previewSource
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleUpload = async() => {
        const formData = new FormData()
        formData.append("displayPicture", file);
        setLoading(true);
        dispatch(updateProfilePicture(formData,token)).then(() => {setLoading(false)})
    }

    useEffect( () => {
        if(file){
            previewFile(file);
            setUploadPopUp(prev => !prev); 
        }
    },[file])

    return (
    <>
        <div className=" flex text-sm border border-richblack-700 w-11/12 sm:w-9/12 rounded-lg bg-richblack-800 justify-between px-4 py-5 sm:p-8">
            <div className=" relative flex gap-6 items-center">
                <img 
                    src={previewSource || (image ? image : user?.imageUrl)} 
                    alt={`${user.firstname} ${user.lastname} `} 
                    className="object-cover w-[18%] sm:w-1/6 md:w-[60px] rounded-full aspect-square"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-richblack-5 text-lg whitespace-nowrap">Change Profile Picture</p>
                    <div className="flex gap-4" >
                        <label 
                            className="bg-richblack-700 text-richblack-400 p-3 sm:px-8 rounded-lg font-semibold cursor-pointer"
                        >
                            Select File
                            <input 
                                type="file" 
                                onChange={handleFileSelect}
                                hidden
                            />
                        </label>
                        
                    </div>
                </div>
            </div>
        </div>
        {
            uploadPopUp && 
            (
                <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
                    <div className=" bg-richblack-900 flex text-richblack-200 rounded-3xl h-[200px] w-[500px] border border-richblack-700">            
                        <div className=" flex flex-col gap-2">
                            <p className="pt-7 pl-6">The selected file is shown in the profile. Press the upload button to make it permanent.</p>
                            <button
                                className="bg-yellow-50 text-richblack-900 rounded-lg p-3 font-semibold flex items-center gap-2 w-1/4 ml-7 mt-1"
                                onClick={() =>{
                                    handleUpload()
                                    setUploadPopUp(false);
                                }}
                            >
                                {loading ? "Uploading... " : "Upload" }
                                {!loading && (
                                    <FiUpload className="text-lg text-richblack-900" />
                                )}
                            </button>
                        </div>
                        <button
                            className="flex self-start py-7 pr-4"
                            onClick={() => {
                                setUploadPopUp(prev => !prev)
                            }}
                        >
                            <GiCrossMark/>
                        </button>
                        
                    </div>
                </div>
            )
        }
    </>
  )
}

export default UpdateProfilePicture