import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma: any = new PrismaClient();
import { standard_error, ability_measure, Compare_measure_B } from "./function";
interface data {
    id?: string;
    question_level: number;
    sub_id: number;
    question: string;
    choice: object;
    answer: string;
    level: string;
}

interface ExamQuestion {
    id: string;
    question_level: number;
    sub_id: number;
    ability_measure: number;
    answer: string;
    choice: {
      choice: string;
      sub_answer: string;
    }[];
    exam_result: number;
    h: number;
    level: string;
    no: number;
    question: string;
    r: number;
    standard_error: number;
  }

exports.addExample = async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as [data]
    for (let data of body) {
        let sub_id = await prisma.examination.findMany({
            where: {
                question_level: data.question_level,
                level: data.level
            }
        })
        if (sub_id.length >= 0) {
            await prisma.examination.create({
                data: {
                    question_level: data.question_level,
                    sub_id: sub_id.length + 1,
                    question: data.question,
                    choice: data.choice,
                    answer: data.answer,
                    level: data.level,
                }
            })
        }
    }
    res.code(200).send({message:"ok"})
}
exports.getExamination = async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as ExamQuestion
    if (body.id.length === 0) {
        const first = await prisma.examination.findMany({
            where: {
                question_level: 2,
                sub_id: Math.floor(Math.random() * 10) + 1,
                level: body.level
            }
        }) as [{
            question_level: number;
            sub_id: number;
            level: string;
        }]

        let obj = {
            no: body.no,
            h: body.h,
            r: body.r,
            exam_result: 1
        } as any
        first.forEach((element: any) => {
            for (let key in obj) {
                element[key] = obj[key]
            }
        });
        return res.code(200).send(first)
    }

    const getExample = await prisma.examination.findUnique({
        where: {
            id: body.id
        }, select: {
            answer: true
        }
    })
    let L = body.no
    let R = body.r
    let question_level = body.question_level

    if (getExample.answer === body.answer) {
        R = body.r + 1
        question_level = body.question_level + (2 / L)
    }
    if (getExample.answer !== body.answer) {
        question_level = body.question_level - (2 / L)
    }

    let wrong = L - R
    let D = Math.abs(question_level) < 1 ? 1 : Math.abs(question_level) > 3 ? 3 : Math.abs(question_level)
    let H = body.h + D

    let exam_result = Compare_measure_B(H, L, R, wrong)
    let obj = {
        question_level: D,
        no: L + 1,
        h: H,
        r: R,
        exam_result: exam_result,
        standard_error: standard_error(R, wrong, L),
        ability_measure: ability_measure(H, L, R, wrong)
    } as any

    const outExample = await prisma.examination.findMany({
        where: {
            question_level: Math.floor(D),
            sub_id: Math.floor(Math.random() * 10) + 1,
            level: body.level
        }
    })
    outExample.forEach((element: any) => {
        for (let key in obj) {
            element[key] = obj[key]
        }
    });
    return res.send(outExample)
}

exports.getParams = async (req: FastifyRequest, res: FastifyReply) => {
    const params = req.params as { level: string }
    let getExample = await prisma.examination.findMany({
        where: {
            level: params.level
        }
    })
    return res.status(200).send(getExample)
}

exports.deleteExample = async (req: FastifyRequest, res: FastifyReply) => {
    const params = req.params as { id: string }
    let deleteExample = await prisma.examination.delete({ where: { id: params.id } })
    if (deleteExample) res.status(200).send({ message: "ok" })
}

exports.updateExample = async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as data
    const updateExample = await prisma.examination.update({
        where: {
            id: body.id
        },
        data: {
            question_level: body.question_level,
            question: body.question,
            choice: body.choice,
            answer: body.answer,
            level: body.level,
        }
    })
    if (updateExample) res.status(200).send({ message: "ok" })
} 