import { FastifyInstance } from "fastify";
import { verifyMiddleware } from "../../verifyInterceptor/verifyInterceptor";
const schemas = require('../../schemas/example')
const handler = require('../../handler/example/example')
const exampleRoute = async (fastify: FastifyInstance) => {
  fastify.post("/get",{preHandler:[verifyMiddleware] ,schema:schemas.ExamQuestion},handler.getExamination);
  fastify.get("/get/:level" ,{preHandler:[verifyMiddleware] , schema:schemas.getLevel}, handler.getParams);
  fastify.post("/add",{schema:schemas.addExample},handler.addExample);
  fastify.post("/remove/:id",{schema:schemas.deleteExample},handler.deleteExample);
  fastify.put("/update",{schema:schemas.updateExample},handler.updateExample);
};
export default exampleRoute;