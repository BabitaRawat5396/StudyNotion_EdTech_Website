
import { useEffect, useState } from 'react';
import {BiCloudUpload} from 'react-icons/bi';

const FileUpload = ({setValue,errors,register,data,fileType,name,label}) => {
  
  let fileURL;  

  if(fileType === 'image'){
    fileURL = data?.thumbnail;
  }
  else if(fileType === 'video'){
    fileURL = data?.videoUrl;
  }

  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(fileURL || null);


  // Read the file to show it for preview
  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // When reading done...!!!!
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if(file){
      setFile(file);
      preview(file);
    }
  }
  
  useEffect( () => {
    register(name,{required:true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect( () => {
    if(file){
      preview(file);
      setValue(name,file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[file]);

  return (
    <div  className="flex flex-col gap-1">

      <p className="text-richblack-25 text-sm px-1">
        {label}
        <span className="text-pink-400 text-lg"> *</span>
      </p>

      <div className='border-2 border-dashed border-richblack-600 bg-richblack-700 rounded-xl h-full w-full flex flex-col 
        items-center justify-center gap-5 p-5'>
        {
          !previewSource ? 
          (
            <label className='flex flex-col gap-6 items-center cursor-pointer'>
              <BiCloudUpload className=' bg-yellow-900 text-yellow-50 rounded-full h-fit w-fit p-4 text-3xl'/>
              <p className=' text-richblack-300 w-[79%] md:w-[60%] text-center'>Drag and drop an {fileType}, or <span className=' text-yellow-50'>Browse</span> Max 6MB each (12MB for videos)</p>
              <ol className=' text-richblack-300 flex flex-col md:flex-row md:gap-16 items-center' style={{ listStyleType: "disc" }}>
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ol>
              <input
                type="file"
                hidden
                accept={fileType === 'image' ? 'image' : 'video/*,image/gif'}
                onChange={handleFileSelect}
              />
              {
                errors.thumbnailImage && (
                  <p className=" text-pink-300 text-sm px-1">Please upload a thumbnail</p>
                )
              }
            </label>
          ) : (
            <div className='flex flex-col items-center justify-center gap-2 h-full w-full'>
            {
              fileType === 'image' ? (
                <img src={fileURL || previewSource} alt='previewSource' className='object-cover max-h-full max-w-full rounded-2xl'/>
              ) : (
                <video src={fileURL || previewSource} muted autoPlay loop className=' h-[70%] rounded-2xl'></video>
              )
            }
              <button
                onClick={() => setPreviewSource(null)}
                className='text-yellow-100 bg-richblue-700 px-3 rounded-2xl py-1'
                
              >
                Cancel
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FileUpload;