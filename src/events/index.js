const { sendPurchaseEmail, registrationEmail } = require('../utils/Mail')
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const userCreated = 'USER_CREATED'
// Handle the 'userCreated' event
eventEmitter.on(userCreated, (user) => {
    console.log(`Event: User registered: ${user.name} (${user.email})`);
    registrationEmail(user)
    console.log('Email sent')
});

const checkoutSuccessful = 'CHECKOUT_SUCCESSFUL'
// Handle the 'userCreated' event
eventEmitter.on(checkoutSuccessful, (payload) => {
    console.log('Event: Checkout successful')
    sendPurchaseEmail(payload)
    console.log('Email sent')
});

module.exports = {
    eventEmitter,
    userCreated,
    checkoutSuccessful
};
