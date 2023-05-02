import { FastifyReply, } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma: any = new PrismaClient();
export const util = require('util')
export const path = require('path')
export const { pipeline } = require('stream')
export const pump = util.promisify(pipeline)
export const fs = require("fs");
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

exports.uploadedImage = async (req: any, res: FastifyReply) => {
    const data = await req.body;
    const cloudinaryResponse = await cloudinary.uploader.upload(data.image, opts);
    const editProfile = await prisma.student.update({
        where: {
            id: data.id
        },
        data: {
            image_url: cloudinaryResponse.secure_url
        }
    })
    const nameImg = await prisma.image_url.create({
        data: {
            image_url: cloudinaryResponse.secure_url,
            type: `image/${cloudinaryResponse.format}`
        }
    })
    res.send({ url: cloudinaryResponse.secure_url });
    if (nameImg && editProfile) res.send("Success! import photos = " + { url: cloudinaryResponse.secure_url , status : true } );
}

exports.getImg = async (req: any, res: FastifyReply) => {
    const imgid = req.params.img_id as any
    const buffer = fs.readFileSync("./uploads/" + imgid);
    res.type("image/jpg");
    res.send(buffer);
}

exports.uploadedImageFromAndroid = async (req: any, res: FastifyReply) => {
    const data = await req.body;
    const cloudinaryResponse = await cloudinary.uploader.upload(data.image, opts);
    let nameImg = '';
   if(data.key === "hiwkao"){
       nameImg = await prisma.image_url.create({
           data: {
               image_url: cloudinaryResponse.secure_url,
               type: `image/${cloudinaryResponse.format}`
           }
       })
       res.send({ url: cloudinaryResponse.secure_url });
   }
    if (nameImg) res.send("Success! import photos = " + { url: cloudinaryResponse.secure_url , status : true } );
}
