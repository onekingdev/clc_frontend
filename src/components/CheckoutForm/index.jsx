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
import Modal from 'react-awesome-modal';

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
    update,
    user,
    onSelectPlan = null,
    showPickingStatus,
    hideButtons = false,
    showReactivateButton = false,
    reactivateLoading = false,
    reactiveHandler = () => {}
}) {
    const [msg, setMsg] = useState(null);
    const rewardfulId = useSelector(state=> state.authState.user.rewardfulId)
    const selector = useSelector(store => store.authState)
    const [disabled, setDisabled] = useState(true);
    const [subscriptionType, setSubscriptionType] = useState("");
    const [subscriptionInterval, setSubscriptionInterval] = useState("month");
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
        setDisabled(event.empty);
        setMsg(event.error ? event.error.message : "");
    };
    const [showConfirmChangePlan, setShowConfirmChangePlan] = useState(false);
    const handleChangePlan = () => {
        setShowConfirmChangePlan(true);
    }
    const handleSubmit = async e => {
        setShowConfirmChangePlan(false);
        //e.preventDefault();
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

        const today = new Date()
        const firstPaymentDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDay())
        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        }).catch(console.log)

        if (fetchPaymentSubscription === null) {
            setSucceeded(true);
            setProcessing(false);
        }
        if (fetchPaymentSubscription !== null) {

            if (result.error) {
                setMsg(`Payment failed ${result.error.message}`);
                setProcessing(false);
            } else {
                const res = await fetchPaymentSubscription(email, result.paymentMethod, subscriptionType, subscriptionInterval, rewardfulId).catch(console.log);
                if (res.status === 'error') {
                    setMsg(`Stripe configuration changed. Please contanct admin`);
                }
                else if(res.status == "invalid_creditcard") {
                    setMsg(`Invalid Credit Card or Network Connection Error`);
                    setProcessing(false);
                }
                else if (res.status === 'requires_action') {
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
                    trackEvent(`${subscriptionType} plan purchased`)
                    setIsSelected(false)
                }
            }
        }
        setProcessing(false)

        //  else if (updatePaymentDetails !== null) {
        //     const res = await updatePaymentDetails(result.paymentMethod).catch(console.log);
        //     if (res.id) {
        //         setSucceeded(true);
        //         setProcessing(false);
        //         trackEvent(`${subscriptionType} plan updated`)

        //     } else {
        //         setSucceeded(false);
        //         setProcessing(false);

        //     }
        // }

    };
    const handleSelectPlan = (value, interval) => {
        if(onSelectPlan !== null) {
            onSelectPlan(value);
            return;
        }
        setSubscriptionType(value)
        setSubscriptionInterval(interval)
        setIsSelected(true)
        trackEvent(`${value} plan selected`)
    }

    return (
        <>
            <div className="payment-container">
                <div style={{ opacity: isSelected ? 0.6 : 1 }}>
                    {selector.user.type === 'admin' ? 
                        <div className="subscriptions_container_one">
                            <SuscriptionCard
                                title="CL TEST"
                                price={5}
                                benefitsActive={false}
                                value="CL TEST"
                                glow
                                handleGetMemberType={handleSelectPlan}
                                update={update}
                                pickedPlan={user.payment.subscriptionType === 'CL TEST'}
                                pickedInterval={user.payment.subscriptionInterval}
                                showPickingStatus={showPickingStatus}
                                hideButtons={hideButtons}
                                showReactivateButton={showReactivateButton}
                                reactivateLoading={reactivateLoading}
                                reactiveHandler={reactiveHandler}
                            />
                        </div>
                        :
                        <div className="suscriptions-container">
                            <SuscriptionCard
                                title="CL AI"
                                price={59}
                                benefitsActive={false}
                                value="CL AI"
                                glow
                                handleGetMemberType={handleSelectPlan}
                                update={update}
                                pickedPlan={user.payment.subscriptionType === 'CL AI'}
                                pickedInterval={user.payment.subscriptionInterval}
                                showPickingStatus={showPickingStatus}
                                hideButtons={hideButtons}
                                showReactivateButton={showReactivateButton}
                                reactivateLoading={reactivateLoading}
                                reactiveHandler={reactiveHandler}
                            />
                            <SuscriptionCard
                                title="CL AI+"
                                price={129}
                                glow
                                benefitsActive={true}
                                value="CL AI+"
                                handleGetMemberType={handleSelectPlan}
                                update={update}
                                pickedPlan={user.payment.subscriptionType === 'CL AI+'}
                                pickedInterval={user.payment.subscriptionInterval}
                                showPickingStatus={showPickingStatus}
                                hideButtons={hideButtons}
                                showReactivateButton={showReactivateButton}
                                reactivateLoading={reactivateLoading}
                                reactiveHandler={reactiveHandler}
                            />
                        </div>
                    }
                </div>
                {isSelected ?
                    <form id="payment-form">
                        <ToastContainer />
                        {!user.payment.customerID && (
                            <div className="sub-card-title">
                                {/* <SmallText fontSize="20px">{subscriptionType}</SmallText> */}
                                <SmallText fontSize="20px">{"Your credit card won't be charged for 7 days, you can cancel at anytime "}</SmallText>
                            </div>
                        )}
                        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                        <br />
                        <div className="checkoutFormButtonWrapper">
                            <Button
                                loading={processing}
                                disabled={processing || disabled || succeeded}
                                id="submit"
                                onClick={handleChangePlan}
                                width={300}
                                height={44}
                                glow
                                text={updatePaymentDetails !== null ? 'Update' : 'Sign Up Today'} />
                        </div>
                        {succeeded ?
                            <ErrorDisplay message={msg} show={msg} color="var(--primary)" /> :
                            <ErrorDisplay message={msg} show={msg} />}
                    </form>
                    :
                    null
                }
            </div>
            <Modal
                visible={showConfirmChangePlan}
                width="540px"
                height="320px"
                effect="fadeInUp"
                onClickAway={() => setShowConfirmChangePlan(false)}
            >
                <div className="confirm-modal">
                    <div className="text-content">
                        <span>You are switching from</span> <b>{user.payment.subscriptionType} {user.payment.subscriptionInterval}ly</b> <span>to</span> <b>{subscriptionType} {subscriptionInterval}ly</b><span>, your current subscription will end today and your new plan will start effective immediately</span>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        width={150}
                        height={40}
                        glow
                        text="Confirm" />
                </div>
            </Modal>
        </>
    );
}