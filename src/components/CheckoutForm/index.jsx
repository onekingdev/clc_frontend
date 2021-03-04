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

toast.configure();

export default function CheckoutForm({
                                         clientSecret,
                                         email,
                                         succeeded,
                                         setSucceeded
                                     }) {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
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
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email
                }
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            toast(`Payment failed ${payload.error.message}`, {type: "error"});
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setTimeout(() => setSucceeded(true), 2000)
            toast("Success! Check email for details", {type: "success"});
        }
    };

    return (
        <form id="payment-form">
            <ToastContainer/>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
            <br/>
            <Button
                loading={processing}
                disabled={processing || disabled || succeeded}
                id="submit"
                onClick={handleSubmit}
                width="100%" height={64}
                glow
                text="Sign Up Today"/>
            {/* Show any error that happens when processing the payment */}
            <ErrorDisplay message={error} show={error}/>
        </form>
    );
}