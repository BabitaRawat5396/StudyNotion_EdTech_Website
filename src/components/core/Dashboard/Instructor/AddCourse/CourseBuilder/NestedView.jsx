
import {MdModeEditOutline,MdArrowDropDown} from 'react-icons/md';
import {RiDeleteBin6Line, RiAddLine} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {HiViewList} from 'react-icons/hi';
import { useState } from 'react';
import ConfirmationModal from '../../../../../common/ConfirmationModal';
import SubSectionModal from './SubsectionModal';
import { deleteSection } from '../../../../../../services/operations/sectionAPI';
import { deleteSubsection } from '../../../../../../services/operations/subsectionAPI';


const NestedView = ({handleEditSectionButton}) => {

  const [confirmationModal, setConfirmationModal] = useState(null);  
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const {course} = useSelector( (state) => state.course);
  const {token} = useSelector( (state) => state.auth);
  const dispatch = useDispatch();


  const handleDeleteSection = (sectionId) =>{
    const data = {
      sectionId:sectionId,
      courseId:course._id
    }
    dispatch(deleteSection(data,token));
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = (subsection_Id,section_Id,course_Id) => {
    console.log("data:",subsection_Id,section_Id,course_Id)
    const data = {
      subsectionId:subsection_Id,
      sectionId:section_Id,
      courseId:course_Id,
    }
    dispatch(deleteSubsection(data,token));
    setConfirmationModal(null);
  }
  
  return (
    <div className='bg-richblack-700 rounded-xl p-6'>
      {
        course?.courseContent.map( (section) => (
          <details key={section._id} className='flex flex-col' open>
            {/* Section Div */}

            <summary 
              className='flex items-center text-richblack-200 border-b-2 py-1
              border-richblack-500 cursor-pointer'>

              <div className='flex gap-2 w-11/12'
                // onClick={() => {setShowAddLecture((prev) => !prev)}}
              >
                <span className='flex text-xl '>
                  <MdArrowDropDown/>
                  <HiViewList/>
                </span>
                <div className='font-semibold text-richblack-400'>{section?.name}</div>
              </div>

              <div className='flex text-xl items-center'>
                <div className='flex gap-2 items-center'>
                  <MdModeEditOutline
                    onClick={() => handleEditSectionButton(section._id,section.name)}
                  />
                  <RiDeleteBin6Line
                    onClick={() => {
                      setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                      })
                    }}
                  />
                  <p>|</p>
                </div>
                <MdArrowDropDown 
                  className='text-4xl'
                  // onClick={() => {setShowAddLecture(prev => !prev)}}
                />
              </div>
            </summary>
            
            {/* SubSection Div */}
            <div>
            {
              section?.subsection?.map( (subsection) => (
                <div 
                  key={subsection._id} 
                  className='flex items-center text-richblack-200 border-b-2 py-3
                  border-richblack-500 cursor-pointer w-[90%] mx-auto'
                  onClick={() => setViewSubSection(subsection)}
                  >
                  <div className='flex gap-2 w-[85%]'>
                    <span className='flex text-xl '>
                      <MdArrowDropDown/>
                      <HiViewList/>
                    </span>
                    <div className='font-semibold text-richblack-400'>{subsection?.title}</div>
                  </div>

                  <div 
                    onClick={(event) => event.stopPropagation()}
                    className='flex text-xl items-center'>
                    <div className='flex gap-2 items-center'>
                      <MdModeEditOutline
                        onClick={() => setEditSubSection(subsection)}
                      />
                      <RiDeleteBin6Line
                        onClick={() => {
                          setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(subsection?._id,section._id,course._id),
                          btn2Handler: () => setConfirmationModal(null),
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            }
            </div>
            <div 
              className=' text-yellow-50 flex px-5 py-4 gap-1 cursor-pointer text-lg font-bold items-center'
              onClick={() => {setAddSubSection({sectionId:section._id})}}
              >
              <RiAddLine fontSize={28}/>
              <p>Add Lecture</p>
            </div>
          </details>
        ))
      }
      {addSubSection ? 
      (<SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
      />) 
      :viewSubSection ? 
      (<SubSectionModal 
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
      />) 
      : editSubSection ? 
      (<SubSectionModal
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
      />)
      : (<div></div>)
      }
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}    

    </div>
  )
}

export default NestedView