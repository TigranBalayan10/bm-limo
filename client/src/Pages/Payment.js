import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { GET_PUBLISHABLE_KEY } from "../Utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "../Utils/mutations";
import { useParams } from "react-router-dom";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { orderId } = useParams();

  const {
    loading: keyLoading,
    error: keyError,
    data: keyData,
  } = useQuery(GET_PUBLISHABLE_KEY);
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  useEffect(() => {
    if (!keyLoading && !keyError && keyData) {
      const initializeStripe = async () => {
        const stripe = await loadStripe(keyData.getPublishableKey);
        setStripePromise(stripe);
      };
      initializeStripe();
    }
  }, [keyData, keyLoading, keyError]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await createPaymentIntent({ variables: { orderId } });
        setClientSecret(data.createPaymentIntent.clientSecret);
        setName(data.createPaymentIntent.name);
        setEmail(data.createPaymentIntent.email);
      } catch (error) {
        console.log("Failed to fetch client secret:", error);
      }
    };

    fetchClientSecret();
  }, [createPaymentIntent, orderId]);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, name, email }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
