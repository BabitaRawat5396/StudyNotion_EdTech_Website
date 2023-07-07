import aboutus1 from '../../../assets/Images/aboutus1.webp';
import aboutus2 from '../../../assets/Images/aboutus2.webp';
import aboutus3 from '../../../assets/Images/aboutus3.webp';


const imagesContent = [
  {
    img:aboutus1,
    title:"Our Founding Story",
    description:"Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.",
  },
  {
    img:aboutus2,
    title:"Our Vision",
    description:"With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
  },
  {
    img:aboutus3,
    title:"Our Mission",
    description:"Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
  },
];


const ImageContent = () => {

  return (
    <div className='sm:w-10/12 lg:absolute lg:-top-[15rem] py-14 lg:py-0'>
      <div className='flex flex-col lg:flex-row'>
      {
        imagesContent.map((content,index) => (  
          <div key={index} className='social-btn flex-center'>
            <img src={content.img} alt={content.title} width="350" className='rounded-xl'/>
            <div className='content-container flex flex-col gap-3 p-4 bg-richblack-900 
              border border-richblack-800 rounded-xl'>
              <h1 className={`text-3xl bg-gradient-to-r text-transparent bg-clip-text font-semibold
                ${index === 0 ? " from-yellow-400 via-red-500 to-pink-500 " : index === 1 ? "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" : "from-[#ec7f0a] via-[#ec800a] to-[#ec810b]"}`}>
                {content.title}
              </h1>
              <p className='text-richblack-600 px-4 font-semibold text-sm'>{content.description}</p>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default ImageContent