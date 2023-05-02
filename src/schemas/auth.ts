exports.login = {
    tags: ['Authentication'],
    body: {
        type: "object",
        required: ["username", "password"],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
    },
    response: {
        200: {
            message: { type: "string" },
            data: {
                username: 'string',
                token: 'string',
            },
            user_id: { type: 'string' },
            status: { type: 'boolean' }
        },
    },
}

exports.register = {
    tags: ['Authentication'],
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string'},
            email: { type: 'string'},
            tel: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        required: ['username', 'password', 'email', 'firstName', 'lastName']
    },
    response: {
        200: {
            message: { type: "string" },
            status: { type: 'boolean' }
        },
    },
}

exports.forgot = {
    tags: ['Authentication'],
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            email: { type: 'string'},
        },
        required: ['username', 'email']
    },
    response: {
        200: {
            message: { type: "string" },
            status: { type: 'boolean' },
            otp:{type: 'string'},
            err:{type: 'string'}
        },
    },
}

exports.resetPassword = {
    tags: ['Authentication'],
    body: {
        type: 'object',
        properties: {
            username:  { type: "string" },
            password :  { type: "string" },
            hash :  { type: "string" },
        },
        required: ['username', 'password']
    },
    response: {
        200: {
            message: { type: "string" }
        },
    },
}