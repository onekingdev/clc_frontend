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
import moment from "moment";
import Button from "../../components/Button";
import IframeResizer from 'iframe-resizer-react'
import {PulseLoader} from "react-spinners";
import TitleText from "../../components/TitleText";
import SmallText from "../../components/SmallText";

const promise = loadStripe("pk_test_RqGIvgu49sLej0wM4rycOkJh");

// id:              prod_ItM3Rl00ARmZwI
// app id:          price_1IHZKzAT9ya87fpT4uf93joS
// Publishable key: pk_test_RqGIvgu49sLej0wM4rycOkJh

function Payment(props: any) {
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        props.fetchPaymentIntent([{ id: "prod_ItM3Rl00ARmZwI" }]);
        setTimeout(() => setShowIframe(true), 2000);
    }, [])

    useEffect(() => {
        if (succeeded) {
            props.fetchUpdatedPaymentData(props.user.email, () => setRedirect(true));
            setProcessing(false);
        }
    }, [succeeded])

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
                    {moment(props.user.payment.subscription).diff(moment(), 'days') > 0 ?
                        <Button onClick={() => {
                            setTimeout(() => history.push('home'), 500)
                        }} width="30%" height={64} text="Start" glow/>
                         :
                        <Elements stripe={promise}>
                            <CheckoutForm
                                callback={(value: boolean) => setProcessing(value)}
                                processing={processing}
                                clientSecret={props.clientSecret}
                                email={props.user.email}
                                succeeded={succeeded}
                                setSucceeded={setSucceeded}/>
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
        fetchUpdatedPaymentData: (email: string, callback: () => void) => dispatch(ACTIONS.fetchUpdatedPaymentData(email, callback))
    };
};

export default connect(mapStateToProps, bindActions)(Payment);