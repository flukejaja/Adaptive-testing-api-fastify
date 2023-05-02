exports.ExamQuestion = {
    tags: ['Example'],
    body: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            question: { type: 'string' },
            no: { type: 'number' },
            question_level: { type: 'integer' },
            answer: { type: 'string' },
            h: { type: 'string' },
            r: { type: 'string' },
            level: { type: 'string' },
        },
        required: ['id', 'question', 'question_level', 'no', 'answer', 'h', 'r', 'level'],
    },
    response: {
        200: {
            id: { type: 'string' },
            question_level: { type: 'integer' },
            sub_id: { type: 'integer' },
            ability_measure: { type: 'number' },
            answer: { type: 'string' },
            choice: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        choice: { type: 'string' },
                        sub_answer: { type: 'string' }
                    },
                    required: ['choice', 'sub_answer']
                }
            },
            exam_result: { type: 'integer' },
            h: { type: 'integer' },
            level: { type: 'string' },
            no: { type: 'integer' },
            question: { type: 'string' },
            r: { type: 'integer' },
            standard_error: { type: 'number' }
        },
    },
}
exports.addExample = {
    tags: ['Example'],
    body: {
        type: 'object',
        properties: {
            question_level: { type: 'number' },
            sub_id: { type: 'number' },
            question: { type: 'string' },
            choice: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        choice: { type: 'string' },
                        sub_answer: { type: 'string' }
                    },
                    required: ['choice', 'sub_answer']
                }
            },
            answer: { type: 'string' },
            level: { type: 'string' },
        }
    },
    response: {
        200: {
            message: { type: 'string' },
        }
    }
}

exports.deleteExample = {
    tags: ['Example'],
    params: {
        id: { type: 'string' },
    },
    response: {
        200: {
            message: { type: 'string' },
        }
    }
}

exports.updateExample = {
    tags: ['Example'],
    body: {
        type: 'object',
        properties: {
            question_level: { type: 'number' },
            sub_id: { type: 'number' },
            question: { type: 'string' },
            choice: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        choice: { type: 'string' },
                        sub_answer: { type: 'string' }
                    },
                    required: ['choice', 'sub_answer']
                }
            },
            answer: { type: 'string' },
            level: { type: 'string' },
        }
    },
    response: {
        200: {
            message: { type: 'string' },
        }
    }
}

exports.getLevel = {
    tags: ['Example'],
    params: {
        level: { type: 'string' },
    },
    response: {
        200: {
            question_level: { type: 'number' },
            sub_id: { type: 'number' },
            question: { type: 'string' },
            choice: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        choice: { type: 'string' },
                        sub_answer: { type: 'string' }
                    },
                    required: ['choice', 'sub_answer']
                }
            },
            answer: { type: 'string' },
            level: { type: 'string' },
        }
    }
}
