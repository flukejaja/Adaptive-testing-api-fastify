exports.getStudent = {
    tags: ["Student"],
    params: {
        type: "object",
        required: ["name"],
        properties: {
            name: { type: "string" },
        },
    },
    response: {
        200: {
            message: { type: "string" },
            result: { type: "array" }
        },
    },
};
exports.updateProfile = {
    tags: ["Student"],
    body: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string'},
            tel: { type: 'string' },
            level: { type: 'string' },
            score: { type: 'string' }
        },
    },
    response: {
        200: {
            message: { type: "string" },
        },
    },
}

exports.updateHistory = {
    tags: ["Student"],
    body: {
        type: "object",
        required: ["id"],
        properties: {
            id: {type: 'string'},
            data:{type:'array'}
        },
    },
    response: {
        200: {
            message: { type: "string" },
        },
    },
}