import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseCreation from "./CourseCreation";
import PublishCourse from "./PublishCourse";
import CourseBuilder from "./CourseBuilder";


export default function RenderSteps() {
  const { renderPageNo } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mt-4 mb-2 flex justify-center lg:w-[60%]">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center"
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-8 lg:w-[34px] place-items-center rounded-full border-[1px] ${
                  renderPageNo === item.id
                    ? "border-yellow-100 bg-yellow-900 text-yellow-100"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${renderPageNo > item.id && "bg-yellow-100 text-yellow-50"}} `}
              >
                {renderPageNo > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    renderPageNo > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-8 flex w-[60%] select-none justify-between">
        {steps.map((item) => (
          <div
              className="flex min-w-[59%] lg:min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  renderPageNo >= item.id ? "text-yellow-100" : "text-richblack-500"
                } ${item.id === 1 ? "pr-14 whitespace-nowrap" : item.id === 2 ? "pr-9 whitespace-nowrap" : "pl-4" }`}
              >
                {item.title}
              </p>
            </div>
        ))}
      </div>

      {/* Rendering Page */}
      <div className='lg:w-[75%] mb-14'>
          { renderPageNo === 1 && ( <CourseCreation/>) }
          { renderPageNo === 2 && ( <CourseBuilder/> ) }
          { renderPageNo === 3 && ( <PublishCourse/> ) }
        </div>
    </>
  )
}