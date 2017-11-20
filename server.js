import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import schema from "./data/schema";
import compression from "compression";
import { Engine, expressMiddleware } from "apollo-engine";
import cors from "cors";
import graphqlHttp from "express-graphql";

const GRAPHQL_PORT = 3000;
const APOLLO_ENGINE_API_KEY =
  "service:albertoblaz-Hackweek-graphql:W0u7lLyWG3cQ7taxSxc4hw";

// Option 1: JSON Object
const engine = new Engine({
  engineConfig: {
    apiKey: APOLLO_ENGINE_API_KEY,
    logging: {
      level: "WARN" // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    }
  },
  graphqlPort: 3000, // GraphQL port
  endpoint: "/graphql", // GraphQL endpoint suffix - '/graphql' by default
  dumpTraffic: true // Debug configuration that logs traffic between Proxy and GraphQL server
});

engine.start();

// Option 2: Config.json
// const engine = new Engine({ engineConfig: "path/to/config.json" });

const app = express();

app.use(engine.expressMiddleware());

app.use(
  "/graphql",
  bodyParser.json(),
  cors(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true
  })
);

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(compression());

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
