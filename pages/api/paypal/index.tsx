const paypal = require('@paypal/checkout-server-sdk');

const configureEnvironment = function () {
  const clientId = 'AcoJt7M_rFHEa0bn9nP9ZlKOviKFZprXWCkeG2K-ra65Amnq2c89_yVOuNNAiaWdOKH8Q5Jg8XDVRjhM'//process.env.PAYPAL_CLIENT_ID
  const clientSecret = 'ENz8VaS03ngvPWnO_NQ24lyzkxpngHJ1-3l1M6ib8eT0z8ptMmbCn1LIRrTWjK1ulIAXO8bOS3lVPcn1'//process.env.PAYPAL_CLIENT_SECRET

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

const client = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment())
}

export default client