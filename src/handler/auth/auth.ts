import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const otpGenerator = require('otp-generator')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()
export const encodeString = (inputString: string) => {
  const buffer = Buffer.from(inputString, 'utf8');
  return buffer.toString('base64');
}
export const decodeString = (encodedString: string) => {
  const buffer = Buffer.from(encodedString, 'base64');
  return buffer.toString('utf8');
}
const prisma: any = new PrismaClient();
interface data {
  username: string;
  password: string;
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
}

exports.login = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as data
  const user = await prisma.auth.findUnique({
    where: {
      username: body.username,
    },
  });
  if (!user || !body.password) {
    res.code(202).send({ message: "not found", status: false });
  }
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    res.code(202).send({ message: "Failed", status: false });
  }
  let payload = {
    username: user.username,
    role: user.role,
  }
  const token = jwt.sign(payload, "hiwkao", { algorithm: "HS256" });
  let obj = {
    username: body.username,
    token: token,
  };
  return res.code(200).send({ message: "ok", data: obj, user_id: user.id });
}

exports.register = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as data
  const username = await prisma.auth.findUnique({ where: { username: body.username } })
  if (username) return res.status(200).send({ message: "false", status: false })
  const hash = await bcrypt.hash(body.password, 12);
  let auth = await prisma.auth.create({
    data: {
      username: body.username,
      password: hash,
      role: "user",
    },
  })
  if (auth) {
    await prisma.student.create({
      data: {
        name: body.username,
        email: body.email,
        tel: body.tel,
        first_name: body.firstName,
        last_name: body.lastName,
        authId: auth.id
      }
    })
  }
  return res.status(200).send({ message: "ok", status: true });
}
exports.forgotPassword = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as {
    name: string,
    email: string
  }
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  const findManyUser = await prisma.student.findMany({
    select: {
      name: true,
      email: true
    }
  }) as [{
    name: string,
    email: string
  }]
  let findUnique = findManyUser.find((x) => x.name === body.name)
  if (!findUnique) return res.code(200).send({ message: "not found" })
  if (findUnique.email === body.email) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: body.email,
      from: 'apt.bot@hotmail.com',
      subject: 'Hello this your OTP',
      html: `<b>this your otp  ${otp}</b>`
    }
    let text = ""
    await sgMail
      .send(msg)
      .then((value: any) => {
        text = value
      })
      .catch((error: any) => {
        text = error
      })
    return res.status(200).send({ message: "ok", otp: encodeString(otp), err: text })
  } else {
    return res.code(200).send({ message: "not found" })
  }
}
exports.resetPassword = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as {
    username: string;
    password : string;
    hash : string;
  }
  const hash = await bcrypt.hash(body.password, 12);
  if ("hiwkao" === decodeString(body.hash)) {
    const updateUser = await prisma.auth.update({
      where: {
        username: body.username
      },
      data: {
        password: hash
      }
    })
    if (updateUser) return res.code(200).send({ message: "ok" })
  }
}