import { FastifyInstance } from "fastify";
const schemas = require("../../schemas/auth");
const handler = require('../../handler/auth/auth')
const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/login",{schema:schemas.login},handler.login);
  fastify.post("/register",{schema:schemas.register},handler.register);
  fastify.post("/forgot" ,{schema:schemas.forgot} ,handler.forgotPassword);
  fastify.post("/resetpassword",{schema:schemas.resetPassword} , handler.resetPassword);
};
export default authRoutes;