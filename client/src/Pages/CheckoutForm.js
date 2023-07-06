import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { QUERY_ORDER } from "../Utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_ORDER, DELETE_PRICE } from "../Utils/mutations";
import { Link, useParams } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const production = process.env.NODE_ENV === "production";
  const { orderId } = useParams();



  const { loading, error, data } = useQuery(QUERY_ORDER, {
    variables: { id: orderId },
  });

  
  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [deletePrice] = useMutation(DELETE_PRICE);
  
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const priceId = data?.getOrder.price?._id;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: production
          ? "https://beverly-motors-db12ef7ee760.herokuapp.com/payment-success"
          : "http://localhost:3000/payment-success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  
  const handleClick = async () => {
    try {
      await deleteOrder({
        variables: { id: orderId },
      });
      await deletePrice({
        variables: { id: priceId },
      });
      console.log("deleted");
    } catch (error) {
      console.log("Not deleted", error);
    }
  };

  if (loading) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="flex justify-center mb-5 mt-5">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="bg-gray-300 rounded-lg p-7"
      >
        <PaymentElement id="payment-element" />
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2 mt-4"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        <Link to="/payment-cancel">
          <button
            disabled={isProcessing || !stripe || !elements}
            onClick={handleClick}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2 mt-4"
          >
            <span id="button-text">Cancel</span>
          </button>
        </Link>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-red-600">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
