import React from 'react'
import ContactImage1 from '../../../assets/Images/Contact5.jpg'
import ContactImage2 from '../../../assets/Images/Contact7.jpg'
import {BsChatLeftFill}  from 'react-icons/bs'
import {BiWorld} from 'react-icons/bi'
import {MdCall} from 'react-icons/md'

const contact = [
  {
      icon:BsChatLeftFill,
      title:"Chat on us",
      desc1:"Our friendly team is here to help.",
      desc2:"@mail address"
  },
  {
      icon:BiWorld,
      title:"Visit us",
      desc1:"Come and say hello at our office HQ.",
      desc2:"Here is the location/ address"
  },
  {
      icon:MdCall,
      title:"Call us",
      desc1:"Mon - Fri From 8am to 5pm",
      desc2:"+123 456 7890"
  },    
];

const ContactCard = () => {
  return (
    <div>
    <div className="container">
  <div className="info">
    Contact Us
  </div>
  <div className="mobile-layout">
    <div className="book-cover">
        <img className="book-top" src={ContactImage1} alt="book-top" />
      <img className="book-side" src={ContactImage2} alt="book-side" /> 
    </div>
    <div className="preface">
      <div className="content">
        <div className="body">
        {
          contact.map ( (element,index) => (
            <div className='flex gap-3 w-full' key={index}>
              <p className='py-2'>{React.createElement(element.icon)}</p>
              <div>
                <p>{element.title}</p>
                <p>{element.desc1}</p>
                <p>{element.desc2}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  </div>
</div>
    </div>

  )
}

export default ContactCard