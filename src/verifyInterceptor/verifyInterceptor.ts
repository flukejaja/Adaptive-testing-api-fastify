import { FastifyReply, FastifyRequest  } from "fastify";
import jwt from "jsonwebtoken";
require('dotenv').config()

export const verifyMiddleware = async ( request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!request.headers["authorization"])
    reply.status(500).send({ status: false, message: "Error Authorization" });
    const token = request.headers.authorization?.split(" ") as string[];
    JSON.stringify(jwt.verify(token[1], process.env.JWT_KEY ?? 'AS2zx'));
  } catch (error) {
    reply.status(500).send({ status: false, message: "Error" });
  }
};