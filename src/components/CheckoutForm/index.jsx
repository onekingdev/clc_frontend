import React, {useState, useEffect} from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import './styles.css';
import Button from "../Button";
import ErrorDisplay from "../ErrorDisplay";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SuscriptionCard from "../SuscriptionCard";

toast.configure();

export default function CheckoutForm({
                                         clientSecret = null,
                                         email,
                                         succeeded,
                                         setSucceeded,
                                         processing,
                                         setProcessing,
                                         fetchPaymentSubscription = null,
                                         updatePaymentDetails = null,
                                         user
                                     }) {
    const [msg, setMsg] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [subscriptionType,setSubscriptionType] = useState("");
    const [isSelected,setIsSelected] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setMsg(event.error ? event.error.message : "");
        
    };
    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        
        /*const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email
                }
            },
        });

        if (payload.error) {
            callback(false);
            setMsg(`Payment failed ${payload.error.message}`);
            //toast(`Payment failed ${payload.error.message}`, {type: "error"});
        } else {
            setSucceeded(true);
            //toast("Success! Check email for details", {type: "success"});
            setTimeout(() => setMsg(""), 1000)
        }*/
        
        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
           
        });

        if (fetchPaymentSubscription !== null) {

            if (result.error) {
                setMsg(`Payment failed ${result.error.message}`);
                setProcessing(false);
            } else {
                const res = await fetchPaymentSubscription(email, result.paymentMethod,subscriptionType);
                 
                if (res.status === 'error') {
                    setMsg(`Stripe configuration changed. Please contanct admin`);
                } else if (res.status === 'requires_action') {
                    stripe.confirmCardPayment(res.client_secret).then((result) => {
                        if (result.error) {
                            setMsg(`Payment failed ${result.error}`);
                            setProcessing(false);
                        } else {
                            setSucceeded(true)
                        }
                        
                    });
                } else {
                    setSucceeded(true)
                   
                }
            }
        } else if (updatePaymentDetails !== null) {
           const res = await updatePaymentDetails(result.paymentMethod);
           if(res.id) {
               setSucceeded(true);
               setProcessing(false);
               
           } else {
               setSucceeded(false);
               setProcessing(false);
               
           }
        }
        
    };
    const handleSelectPlan = value => {
        setSubscriptionType(value)
        setIsSelected(true)
    }
    
    return (
    <>
        <div className="payment-container">
        <div className="suscriptions-container">  
                <SuscriptionCard 
                    title="CL AI"
                    price={59}
                    benefitsActive={false}
                    value="CL AI"
                    glow
                    handleGetMemberType={handleSelectPlan}
                />
                <SuscriptionCard 
                    title="CL AI+"
                    price={129}
                    glow
                    benefitsActive={true}
                    value="CL AI+"
                    handleGetMemberType={handleSelectPlan}
                />
            </div> 
            {isSelected ? 
                 <form id="payment-form">
           
                 <ToastContainer/>
                 <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
                 <br/>
                 <div className="checkoutFormButtonWrapper">
                     <Button
                         loading={processing}
                         disabled={processing || disabled || succeeded}
                         id="submit"
                         onClick={handleSubmit}
                         width={300}
                         height={44}
                         glow
                         text={updatePaymentDetails !== null ? 'Update' : 'Sign Up Today'}/>
                 </div>
                 {succeeded ?
                     <ErrorDisplay message={msg} show={msg} color="var(--primary)"/> :
                     <ErrorDisplay message={msg} show={msg}/>}
             </form>
                :
                null
            }
        </div>
    </>
    );
}