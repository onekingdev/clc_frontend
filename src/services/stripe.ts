export const getStripeKey = {
    stripe_publishable_key: (env: string) => {
        if (env === 'production') return 'pk_live_elbFCY8g6CYVqpi3JQXrg3qh'
        return 'pk_test_RqGIvgu49sLej0wM4rycOkJh'

        //return "pk_test_51IiuM4IYomqGcrZyfcciykDG3hnNDutZq8AI9TBYt1y42rmFWeYlnZNlBGluDE5O2sskpWA7pY6FA6uibWb5d5BI00XoQazLuz"
    },
}