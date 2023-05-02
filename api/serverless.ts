import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify();

// Register your application as a normal plugin.
app.register(import("../src/server"));
