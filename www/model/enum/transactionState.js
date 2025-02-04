const AWAITING_PAYMENT = 0;
const PAYMENT_RECEIVED = 1;
const PAYMENT_CANCELLED = 2;

const transactionState = {
    AWAITING_PAYMENT,
    PAYMENT_RECEIVED,
    PAYMENT_CANCELLED,

    getList: () => Object.values(transactionState).filter(value => typeof value === 'number')
};

module.exports = transactionState;