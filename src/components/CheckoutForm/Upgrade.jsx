import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import './styles.css';
import Button from "../Button";
import ErrorDisplay from "../ErrorDisplay";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SuscriptionCard from "../SuscriptionCard";
import SmallText from "../SmallText";
import { useSelector } from "react-redux";
import { useIntercom } from "react-use-intercom";

toast.configure();

export default function Upgrade({
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
    const [successMsg, setSuccessMsg] = useState(null);
    const selector = useSelector(store => store.authState)
    const [disabled, setDisabled] = useState(true);
    const [subscriptionType, setSubscriptionType] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {trackEvent} = useIntercom();
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
        setSucceeded(false);
        setDisabled(event.empty);
        setMsg(event.error ? event.error.message : "");

    };
    const handleSubmit = async e => {

        //e.preventDefault();
        setSuccessMsg(null);
        console.log("message is ", msg," card id ", elements.getElement(CardElement))
        if(msg) return;
        setMsg(null);
        setProcessing(true);

        const today = new Date()
        const firstPaymentDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDay())
        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        }).catch(console.log)
        console.log(result.paymentMethod);
        if(!result.paymentMethod){
            setProcessing(false);
            return;
        } 
        const {success,data, message} = await updatePaymentDetails(result.paymentMethod).catch(console.log);
        if (success && data.id) {
            setSucceeded(true);
            setProcessing(false);
            trackEvent(`${subscriptionType} plan updated`)
            elements.getElement(CardElement).clear();
            setSuccessMsg("Your card has been successfully updated.");
            // setMsg("Your card has been successfully updated.")

        } else {
            setSucceeded(false);
            setProcessing(false);
            setMsg(message ? message : "UnKnown Error")
        }
        // elements.getElement(CardElement).clear();
    };
    const handleSelectPlan = value => {
        setSubscriptionType(value)
        setIsSelected(true)
        trackEvent(`${value} plan selected`)
    }

    return (
        <>
            <div className="payment-container">
                    <form id="payment-form" style={{width:"25vw"}}>

                        <ToastContainer />
                        <div className="sub-card-title">
                            <SmallText fontSize="20px">{subscriptionType}</SmallText>
                        </div>
                        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                        <br />
                        <div className="checkoutFormButtonWrapper">
                            <Button
                                loading={processing}
                                disabled={processing || disabled}
                                id="submit"
                                onClick={handleSubmit}
                                width={300}
                                height={44}
                                glow
                                text={'Update'} />
                        </div>
                        {succeeded ?
                            <ErrorDisplay message={msg} show={msg} color="var(--primary)" /> :
                            <ErrorDisplay message={msg} show={msg} />}
                        {successMsg && 
                            <ErrorDisplay message={successMsg} show={successMsg} color="var(--primary)" />
                        }
                    </form>
            </div>
        </>
    );
}