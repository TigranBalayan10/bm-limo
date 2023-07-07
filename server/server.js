const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const {handleWebhookEvent} = require("./config/webhooks");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("./config/connection");
const cors = require("cors");
const path = require("path");


const PORT = process.env.PORT || 3001;
const production = process.env.NODE_ENV === "production";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    handleWebhookEvent(event)

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    // change this to main domain
    origin: production
      ? "https://beverly-motors-db12ef7ee760.herokuapp.com/"
      : "*",
    credentials: true,
  })
);

// Serve up static assets
if (production) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
