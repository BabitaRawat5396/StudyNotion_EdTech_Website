import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import {GiSplitCross} from 'react-icons/gi'
import { useSelector } from "react-redux";

const TagSelection = ({errors,setValue,register}) => {

  const {course,editCourse} = useSelector((state) => state.course);
  const [tags,setTags] = useState([]);

  // Registering "tag" in the first render
  useEffect( () => {
    if(editCourse){
      setTags(course?.tag);
    }
    register("tag",{required:true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // setting value for the variable "tag"
  useEffect( () => {
    setValue("tag",tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tags]);

  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const tag = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if(tags.includes(tag)){
        toast.error("Insert different tag");
      }
      if (tag && !tags.includes(tag)) {
        // Add the chip to the array and clear the input
        const newTag = [...tags, tag]
        setTags(newTag)
        event.target.value = ""
      }
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index,1);
    setTags(updatedTags);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="tag" className="flex flex-col gap-2">
        <p className=" text-richblack-25 text-sm px-1">Tags<span className="text-pink-400 text-lg"> *</span></p> 
        <ul className="flex gap-1 px-3 flex-wrap">
        {
          tags.map( (tag, index) => (
            <li
              key={index}
              className=" bg-[#2d4d60] rounded-xl px-3 py-1 flex text-yellow-300 gap-2 items-center text-base"
            >
              <p>{tag}</p>
              <GiSplitCross className=" text-sm cursor-pointer" onClick={ () => removeTag(index)}/>
            </li>
          ))
        }
        </ul>
        <input
          type="text"
          id="tag"
          name="tag"
          onKeyDown={handleKeyDown}
          placeholder="Choose a Tag"
          className="form-style w-full"
        />
        {
          errors.tag && (
            <p className=" text-pink-300 text-sm px-1">Please Enter Tags</p>
          )
        }
        
      </label>
    </div>
  )
}

export default TagSelection