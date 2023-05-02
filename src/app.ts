import fastify, { FastifyInstance, FastifyServerOptions, FastifyReply, FastifyRequest } from "fastify";
import path from 'path';
const autoload = require('@fastify/autoload')
// import { userSchema } from "./schemas/user";
import { errorSchema } from "./schemas/error";

interface buildOpts extends FastifyServerOptions {
  exposeDocs?: boolean;
}
const build = (opts: buildOpts = {}): FastifyInstance => {
  const app = fastify(opts);

  app.register(require("@fastify/cors"));

  app.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Adaptive-testing-API',
        version: '0.0.1'
      },
    }
  })
  app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request: FastifyRequest, reply: FastifyReply, next: any) { next() },
      preHandler: function (request: FastifyRequest, reply: FastifyReply, next: any) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any, request: FastifyRequest, reply: FastifyReply) => { return swaggerObject },
    transformSpecificationClone: true
  })



  app.get("/", async (_, res) => {
    res.send("Connected to flukeApt");
  });
  app.addSchema(errorSchema);

  app.register(autoload, {
    dir: path.join(__dirname, 'routes')
  })
  return app;
};

export default build;