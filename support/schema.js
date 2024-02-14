import Ajv from 'ajv';

export const schemaTodo = {
  "type": "object",
  "properties": {
    id: {
      type: "integer"
    },
    title: {
      type: "string"
    },
    doneStatus: {
      "type": "boolean"
    },
    description: {
      type: "string"
    }
  },
  required: ["id", "title", "doneStatus", "description"]
};


export const schemaTodos = {
  "type": 'object',
  "properties": {
    todos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          doneStatus: { type: 'boolean' },
          description: { type: 'string' },
        },
        required: ['id', 'title', 'doneStatus', 'description'],
        additionalProperties: false,
      },
    },
  },
  required: ['todos'],
  additionalProperties: false,
};


export function jsonSchemeValidation(response, schema) {
  const ajv = new Ajv();
  const validateTodo = ajv.compile(schema);

  const isValid = validateTodo(response.todos);

  if (!isValid) {
    console.log("Invalid todo", validateTodo.errors);
    return false;
  } else {
    console.log("Todo is valid");
    return true;
  }
}