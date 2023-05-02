import { FastifyInstance } from "fastify";
import { verifyMiddleware } from "../../verifyInterceptor/verifyInterceptor";
const handler = require('../../handler/student/student');
const schema = require('../../schemas/student');
const studentsRoute = async (fastify: FastifyInstance) => {
  fastify.get("/:name",{preHandler:[verifyMiddleware] , schema:schema.getStudent},handler.getParams);
  fastify.get("/search/:name",{schema:schema.getStudent},handler.getSearchStudent);
  fastify.get("/search/user/:name",{schema:schema.getStudent},handler.getSearchStudentUser);
  fastify.put("/update/history",{preHandler:[verifyMiddleware] , schema:schema.updateHistory},handler.updateHistory);
  fastify.put("/update/profile",{preHandler:[verifyMiddleware] , schema:schema.updateProfile},handler.updateProFile);

};
export default studentsRoute;