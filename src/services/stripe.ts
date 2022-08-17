// require("dotenv").config();

export const getStripeKey = {
  stripe_publishable_key: (env?: string) => {
    switch (env) {
      case 'local':
      case 'development':
        return String(process.env.REACT_APP_STRIPE_DEV_KEY);
      case 'production':
        return String(process.env.REACT_APP_STRIPE_PROD_KEY);
      default:
        return String(process.env.REACT_APP_STRIPE_DEV_KEY);
    }
  },
};
