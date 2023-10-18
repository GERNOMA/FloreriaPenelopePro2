import client from './index';
const paypal = require('@paypal/checkout-server-sdk');

export default async function Handler(req: any, res: any) {
  if(req.method != "POST")
    return res.status(404).json({success: false, message: "Not Found"})

  if(!req.body.order_price || !req.body.user_id)
    return res.status(400).json({success: false, message: "Please Provide order_price And User ID"})

  try{
    console.log('1122111');
    const PaypalClient = client()
    console.log('33333333');
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest()
    console.log('66666666');
    request.headers['prefer'] = 'return=representation'
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.order_price+"",
          },
        },
      ],
    })
    const response = await PaypalClient.execute(request)
    if (response.statusCode !== 201) {
      console.log("RES: ", response)
      return res.status(500).json({success: false, message: "Some Error Occured at backend"})
    }

    console.log('1222  ' + (response.result['id']) );

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB 
    return res.status(200).json({success: true, data: response.result['id']})
  } 
  catch(err){
    console.log("Err at Create Order: ", err)
    return res.status(500).json({success: false, message: "Could Not Found the user"})
  }

}