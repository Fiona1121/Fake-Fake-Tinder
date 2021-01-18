require("dotenv-defaults").config();
const mongoose = require("mongoose");
const { GraphQLServer, PubSub } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Message = require("./models/message");
const User = require("./models/user");

if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error(error);
});

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: "./server/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
    context: {
        Message,
        User,
        db,
        pubsub,
    },
});

server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`);
});
