const paypal = require('@paypal/checkout-server-sdk');

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  return new paypal.core.LiveEnvironment(clientId, clientSecret)
}

const client = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment())
}

export default client