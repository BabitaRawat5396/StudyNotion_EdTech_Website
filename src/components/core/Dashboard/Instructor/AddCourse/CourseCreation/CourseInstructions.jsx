import { useState, useEffect } from "react";
import {GiSplitCross} from 'react-icons/gi';
import { useSelector } from "react-redux";


const CourseInstructions = ({register,setValue,errors}) => {

  const {course, editCourse} = useSelector( (state) => state.course);
  const [requirement,setRequirement] = useState("");
  const [requirementList,setRequirementList] = useState([]);

  const addRequirement = () =>{
    setRequirementList([...requirementList,requirement]);
    setRequirement("");
  }
  
  
  const removeRequirement = (index) =>{
    const updatedRequirements = [...requirementList]
    updatedRequirements.splice(index, 1)
    setRequirementList(updatedRequirements);
  }

  // Register "Instruction" variable 
  useEffect( () => {
    if (editCourse) {
      setRequirementList(course?.instructions);

    }
    register("instructions", { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Setting value for "instructions"
  useEffect( () => {
    setValue("instructions",requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[requirementList])
  
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="instructions" className="flex flex-col gap-1">
        <p className="text-richblack-25 text-sm px-1"> Requirements/Instructions
          <span className="text-pink-400 text-lg"> *</span>
        </p>
        <input
          type="text"
          id="instructions"
          name="instructions"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Enter Requirements for the Course"
          className="form-style w-full"
        />
        {
          errors.instructions && 
          (
            <span className=" text-pink-300 text-sm px-1">Please Enter Instructions</span>
          )
        }
      </label>
      <div
        className='text-center w-fit text-base font-bold text-caribbeangreen-600 cursor-pointer px-2'
        onClick={addRequirement}
      >
        Add
      </div>
      <div className="flex flex-col px-2">
      {
        requirementList.map( (item,index) => (
          <ol key={index}>
            <li className=" ">
              <span className="text-yellow-400">
                {item}
                <GiSplitCross 
                  onClick={() => {removeRequirement(index)}}
                  className="cursor-pointer inline mx-2"
              />
              </span>              
            </li>
          </ol>
        ))
      }
      </div>
    </div>
  )
}

export default CourseInstructions;