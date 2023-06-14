import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { GET_PUBLISHABLE_KEY } from "../Utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "../Utils/mutations";


function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const priceId = "647fcbd993c817d3831a66be";

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
        console.log("priceId: ", priceId);
      try {
        const { data } = await createPaymentIntent({ variables: { priceId } });

        setClientSecret(data.createPaymentIntent.clientSecret);
      } catch (error) {
        console.log("Failed to fetch client secret:", error);
      }
    };

    fetchClientSecret();
  }, [createPaymentIntent, priceId]);



  return (
    <>
      
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
