const { Order } = require("../models"); // Import the Order model or your database schema

const handleWebhookEvent = async (event) => {
  let orderId;
  let paymentStatus;
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      orderId = paymentIntentSucceeded.metadata.orderId;
      paymentStatus = "Paid"; // Set the desired payment status

      try {
        const order = await Order.findOneAndUpdate(
          { _id: orderId },
          { paymentStatus: paymentStatus },
          { new: true }
        );
        console.log("Order updated:", order);
      } catch (error) {
        console.log("Error updating order:", error);
      }
      break;
    // ... handle other event types
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      orderId = paymentIntentPaymentFailed.metadata.orderId;
      paymentStatus = "Failed"; // Set the desired payment status
      try {
        const order = await Order.findOneAndUpdate(
          { _id: orderId },
          { paymentStatus: paymentStatus },
          { new: true }
        );
        console.log("Order updated:", order);
      } catch (error) {
        console.log("Error updating order:", error);
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = { handleWebhookEvent };
