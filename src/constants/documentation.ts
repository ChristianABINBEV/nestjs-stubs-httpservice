// constants/documentation.ts

export const entity = {
  id: {
    description: 'The id of the Entity',
    format: 'uuid',
  },
  name: {
    description: 'The name of the Entity',
    maxLength: 250,
  },
  createdIn: {
    name: 'created_in',
    description: 'The timestamp when was created the Entity',
  },
};

//
// Requests
//
export const getOneReq = {
  id: { ...entity.id, required: true },
};
export const createReq = {
  name: { ...entity.name },
};
export const UpdateIDReq = {
  id: { ...entity.id, required: true },
};
export const updateReq = {
  name: { ...entity.name, required: false },
};

export const listResponse = {
  total: {
    description: 'The total of resources',
    maxLength: 250,
  },
  list: {
    description: 'The array of resources',
    isArray: true,
  },
};

//
// Methods
//

export const getOne = {
  operation: {
    summary: 'Get full resource',
  },
  response: {
    ok: {
      status: 200,
      description: 'The full resource.',
    },
    badRequest: {
      status: 400,
      description: 'Has been a error to found or validating the.',
    },
    internal: {
      status: 500,
      description: 'Some error unespected.',
    },
  },
  params: {
    id: {
      name: 'id',
      description: 'The <b>Resource</b> id.',
      allowEmptyValue: false,
      examples: {
        a: {
          summary: 'Resource active',
          value: 'someUUID1',
        },
        b: {
          summary: 'Resource deleted',
          value: 'someUUID2',
        },
        c: {
          summary: 'Resource do not exists',
          value: 'someUUIDNotFound',
        },
      },
    },
  },
};
