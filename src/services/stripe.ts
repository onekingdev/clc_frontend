require("dotenv").config();

export const getStripeKey = {
    stripe_publishable_key: (env: string) => {
        if (env === 'development') return String(process.env.REACT_APP_STRIPE_DEV_KEY);
        return String(process.env.REACT_APP_STRIPE_PROD_KEY);
    },
}