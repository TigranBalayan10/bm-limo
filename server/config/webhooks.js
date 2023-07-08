const { Order } = require("../models"); // Import the Order model or your database schema

const handleWebhookEvent = async (event) => {
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const orderId = paymentIntentSucceeded.metadata.orderId;
      const paymentStatus = "Paid" // Set the desired payment status

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
