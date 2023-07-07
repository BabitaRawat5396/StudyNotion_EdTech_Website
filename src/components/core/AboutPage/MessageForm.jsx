import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className=' mx-auto text-center flex flex-col items-center py-20 border-t-2 border-richblack-800 sm:mx-20'>
      <h1 className=' text-4xl text-richblack-5'>
        Get in Touch
      </h1>
      <p className=' text-base text-richblack-300'>
        We'd love to here for you, Please fill out this form.
      </p>
      <ContactUsForm/>
    </div>
  )
}

export default ContactFormSection