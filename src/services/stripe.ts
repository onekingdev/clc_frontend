require("dotenv").config();

export const getStripeKey = {
    stripe_publishable_key: (env: string) => {
        if (env === 'production') return String(process.env.REACT_APP_STRIPE_PROD_KEY);
        return String(process.env.REACT_APP_STRIPE_DEV_KEY);

    },
}