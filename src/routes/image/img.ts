import { FastifyInstance } from "fastify";

const handler = require('../../handler/image/img')

const imageRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/img', handler.uploadedImage)
    fastify.post('/img/android', handler.uploadedImageFromAndroid)
    fastify.get('/img/:img_id', handler.getImg)
};
export default imageRoutes;