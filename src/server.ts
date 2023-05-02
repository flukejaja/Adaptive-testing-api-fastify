import { FastifyInstance, FastifyReply, FastifyRequest  } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import build from "./app";

const envToLogger :any = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}
export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = build({
  logger:envToLogger,
  bodyLimit: 50 * 1024 * 1024
});

app.listen(8000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

export default async (req : FastifyRequest , res : FastifyReply) => {
  await app.ready();
  app.server.emit('request', req, res);
}
