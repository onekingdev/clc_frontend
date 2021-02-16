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

const promise = loadStripe("pk_test_RqGIvgu49sLej0wM4rycOkJh");

// id:              prod_ItM3Rl00ARmZwI
// app id:          price_1IHZKzAT9ya87fpT4uf93joS
// Publishable key: pk_test_RqGIvgu49sLej0wM4rycOkJh

function Payment(props: any) {
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);

    useEffect(() => {
        props.fetchPaymentIntent([{ id: "prod_ItM3Rl00ARmZwI" }]);
    }, [])

    return (
        <div>
            <iframe></iframe>
            <div className="paymentButtonTextWrapper">
                <Banner topText="IT'S TIME TO" title="Become a Better Poker Player with Chip Leader AI"/>
                <div className="paymentButtonWrapper">
                    {succeeded ?
                        <Button onClick={() => history.push('performance')} width="30%" height={64} text="Start" glow/>
                         :
                        <Elements stripe={promise}>
                            <CheckoutForm clientSecret={props.clientSecret} email={props.user.email} succeeded={succeeded} setSucceeded={setSucceeded}/>
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
        fetchPaymentIntent: (items: {id: string}[]) => dispatch(ACTIONS.fetchPaymentIntent(items))
    };
};

export default connect(mapStateToProps, bindActions)(Payment);