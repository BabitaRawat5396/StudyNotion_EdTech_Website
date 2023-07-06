import { setPaymentLoading } from "../../slices/paymentSlice";
import StudyNotionLogo from '../../assets/Logo/rzp_logo.png';
import { resetCart } from "../../slices/cartSlice";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";
import { toast } from "react-hot-toast";


const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API

} = paymentEndpoints;

// Loading a script
function loadScript(src){
  return new Promise( (resolve) => {
    const script = document.createElement("script");
    script.src = src;
  
    // if script loading is successful
    script.onload = () => {
      resolve(true);
    }

    script.onerror = () =>{
      resolve(false);
    }
    document.body.appendChild(script);
  })
}

// Buying a course
export const buyCourses = async(token, courses, userDetails, navigate, dispatch) => {
  // run the script to enable the pay button of the razorpay
  try {
    const script_response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if(!script_response) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
      Authorization: `Bearer ${token}`,
    })

    if(!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    var options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderResponse?.data.paymentResponse?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise.
      currency: orderResponse?.data.paymentResponse?.currency,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: StudyNotionLogo,
      prefill: {
        name:userDetails.firstName,
        email:userDetails.email
      },
      order_id: orderResponse?.data.paymentResponse?.id, //This is a sample Order id. Pass the `id` obtained in the response of Step 1.
      handler: function(response){
          //send successful wala mail
          sendPaymentSuccessEmail(response, orderResponse?.data.paymentResponse?.amount,token );
          //verifyPayment
          verifyPayment({...response, courses}, token, navigate, dispatch);
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.failed', function (response){
      toast.error("oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error(error.message);
  }
}

// successful payment mail
async function sendPaymentSuccessEmail(response, amount, token) {
  try{
      await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
      },{
          Authorization: `Bearer ${token}`
      })
  }
  catch(error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try{
      const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
          Authorization:`Bearer ${token}`,
      })

      if(!response.data.success) {
          throw new Error(response.data.message);
      }
      // toast.success("payment Successful, Course has been added");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
  }   
  catch(error) {
      console.log("PAYMENT VERIFY ERROR....", error);
      toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}