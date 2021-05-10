import React, {useState, useEffect} from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './styles.css';
// @ts-ignore
import {useHistory} from 'react-router-dom';
import Banner from "../../components/Banner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import * as ACTIONS from './store/actions';
import * as AUTH_ACTIONS from '../../containers/Authentication/store/actions';
import moment from "moment";
import Button from "../../components/Button";
import IframeResizer from 'iframe-resizer-react'
import {PulseLoader} from "react-spinners";
import TitleText from "../../components/TitleText";
import SmallText from "../../components/SmallText";
import {getStripeKey} from "../../services/stripe";

const promise = loadStripe(getStripeKey.stripe_publishable_key(process.env.NODE_ENV));

function Payment(props: any) {
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [showStartBtn, setShowStartBtn] = useState(false);

    useEffect(() => {
        // props.fetchPaymentIntent([{ id: "prod_ItM3Rl00ARmZwI" }]);
        setTimeout(() => setShowIframe(true), 2000);
    }, [])

    useEffect(() => {
        if (moment(props.user.payment.subscription).diff(moment(), 'days') > 0) {
            setShowStartBtn(true);
            
        }
    }, [props.user, props.user.payment.subscription])
   
    return (
        <div>
            {showIframe ? <IframeResizer
                src="https://www.clcpoker.com/ai"
                style={{height: '90vh', width: '100%'}}
                onResized={(e) => alert(JSON.stringify(e))}
            /> :<div className="paymentLoaderWrapper">
                    <PulseLoader loading color="#FFF"/>
                </div>}
            <div className="paymentButtonTextWrapper">
                {/*<Banner topText="IT'S TIME TO" title="Become a Better Poker Player with Chip Leader AI"/>*/}
                <div>
                    <SmallText>IT'S TIME TO</SmallText>
                </div>
                <div>
                    <TitleText>Become a Better Poker Player</TitleText>
                </div>
                <div style={{marginBottom: 20}}>
                    <TitleText>Player with Chip Leader AI</TitleText>
                </div>
                <div className="paymentButtonWrapper">
                    {showStartBtn ?
                        <div className="paymentButtonWrapper">
                            <Button onClick={() => {
                                setTimeout(() => history.push('home'), 500)
                            }} width={300} height={44} text="Start" glow/>
                        </div>
                         :
                        <Elements stripe={promise}>
                            <CheckoutForm
                                setProcessing={(value: boolean) => setProcessing(value)}
                                processing={processing}
                                clientSecret={props.clientSecret}
                                email={props.user.email}
                                succeeded={succeeded}
                                setSucceeded={(value: boolean) => {
                                    setSucceeded(value);
                                    setTimeout(() => props.fetchUpdatedUserData(props.user.email), 5000)
                                }}
                                fetchPaymentSubscription={props.fetchPaymentSubscription}
                                user={props.user}
                           />
                        </Elements>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.authState.user,
        clientSecret: state.paymentState.clientSecret
    };
}

const bindActions = (dispatch: any) => {
    return {
        fetchPaymentIntent: (items: {id: string}[]) => dispatch(ACTIONS.fetchPaymentIntent(items)),
        fetchUpdatedUserData: (email: string) => dispatch(AUTH_ACTIONS.fetchUpdatedUserData(email)),
        fetchPaymentSubscription: (email: string, paymentMethod: any, subscriptionType: any) => dispatch(ACTIONS.fetchPaymentSubscription(email, paymentMethod, subscriptionType))
    };
};

export default connect(mapStateToProps, bindActions)(Payment);