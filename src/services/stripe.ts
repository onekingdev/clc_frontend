require("dotenv").config();

export const getStripeKey = {
    stripe_publishable_key: (env: string) => {
        return String('pk_test_RqGIvgu49sLej0wM4rycOkJh');
    },
}