import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma: any = new PrismaClient();

exports.getParams = async (req: FastifyRequest, res: FastifyReply) => {
    const params = req.params as {name : string}
    const getauthId = await prisma.auth.findUnique({
        where: {
            username: params.name
        },
        select: {
            id: true
        }
    })
    const getStudent = await prisma.student.findUnique({
        where: {
            authId: getauthId.id
        }
    })
    for (let key in getStudent) getStudent[key] === null ? getStudent[key] = '' : getStudent[key]
    return res.status(200).send({ "message": "ok", result: getStudent })
}
exports.getSearchStudent = async (req: FastifyRequest, res: FastifyReply) => {
    const params = req.params as {name : string}
    const getStudent = await prisma.student.findMany({
        where: {
            NOT: {
                name: 'admin'
            },
        },
    })
    getStudent.forEach((element: any) => {
        for (let key in element) element[key] === null ? element[key] = '' : element[key]
    });
    let search = params.name ? getStudent.filter((element: any) => element.name.toLowerCase().includes(params.name.toLowerCase())) : getStudent
    return res.status(200).send({ "message": "ok", result: search })
}

exports.getSearchStudentUser = async (req: FastifyRequest, res: FastifyReply) => {
    const params = req.params as {name : string}
    const getStudent = await prisma.student.findMany({
        where: {
            NOT: {
                name: 'admin'
            },
        },
        select: {
            level:true,
            name:true,
            score:true,
            email:true,
            image_url:true
          },
    })
    getStudent.forEach((element: any) => {
        for (let key in element) element[key] === null ? element[key] = '' : element[key]
    });
    let search = params.name ? getStudent.filter((element: any) => element.name.toLowerCase().includes(params.name.toLowerCase())) : getStudent
    return res.status(200).send({ "message": "ok", result: search })
}


exports.updateHistory = async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as {
        id: string;
        data: any[];
    }
    const checkuser = await prisma.student.findUnique({
        where: {
            authId: body.id
        },
        select: {
            history: true
        }
    })
    let newArr = [] as any
    if (checkuser.history !== null) {
        for (let data of checkuser.history) {
            if (data.level === body.data[0].level) {
                newArr.push({ level: data.level, data: body.data[0].data })
            } else {
                newArr.push({ level: data.level, data: data.data })
            }
        }
        const updateUser = await prisma.student.update({
            where: {
                authId: body.id,
            },
            data: {
                history: checkuser.history.some((x: any) => x.level === body.data[0].level)
                    ? [...newArr]
                    : [...checkuser.history, body.data[0]],
            },
        })
        if (updateUser) return res.status(200).send({ message: "ok" })
    }
    else {
        const updateUser = await prisma.student.update({
            where: {
                authId: body.id,
            },
            data: {
                history: body.data,
            },
        })
        if (updateUser) return res.status(200).send({ message: "ok" })
    }
}
exports.updateProFile = async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as {
        id: string;
        first_name : string;
        last_name : string;
        email : string;
        tel : string;
        level : string;
        score : string;
    }
    const updateProFile = await prisma.student.update({
        where: {
            id: body.id,
        },
        data: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            tel: body.tel,
            level: body.level,
            score: body.score
        },
    })
    if (updateProFile) return res.status(200).send({ message: "ok" })
}