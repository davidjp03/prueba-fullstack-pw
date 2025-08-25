export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Financial Management API',
    version: '1.0.0',
    description: 'API for managing financial movements, users, and reports',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/movements': {
      get: {
        summary: 'Get all movements',
        description: 'Retrieve all financial movements (accessible to all authenticated users)',
        tags: ['Movements'],
        responses: {
          '200': {
            description: 'List of movements',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Movement' }
                }
              }
            }
          },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        summary: 'Create a new movement',
        description: 'Create a new financial movement (admin only)',
        tags: ['Movements'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['concept', 'amount', 'type', 'userId'],
                properties: {
                  concept: { type: 'string' },
                  amount: { type: 'number' },
                  type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                  userId: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Movement created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Movement' }
              }
            }
          },
          '403': { description: 'Admin access required' }
        }
      }
    },
    '/api/movements/{id}': {
      put: {
        summary: 'Update a movement',
        description: 'Update an existing movement (admin only)',
        tags: ['Movements'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  concept: { type: 'string' },
                  amount: { type: 'number' },
                  type: { type: 'string', enum: ['INCOME', 'EXPENSE'] }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Movement updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Movement' }
              }
            }
          },
          '403': { description: 'Admin access required' }
        }
      },
      delete: {
        summary: 'Delete a movement',
        description: 'Delete an existing movement (admin only)',
        tags: ['Movements'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Movement deleted successfully' },
          '403': { description: 'Admin access required' }
        }
      }
    },
    '/api/users': {
      get: {
        summary: 'Get all users',
        description: 'Retrieve all users (admin only)',
        tags: ['Users'],
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' }
                }
              }
            }
          },
          '403': { description: 'Admin access required' }
        }
      }
    },
    '/api/users/{id}': {
      put: {
        summary: 'Update a user',
        description: 'Update user name and role (admin only)',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  role: { type: 'string', enum: ['ADMIN', 'USER'] }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          '403': { description: 'Admin access required' }
        }
      }
    },
    '/api/reports': {
      get: {
        summary: 'Get financial reports',
        description: 'Get financial balance and monthly data (admin only)',
        tags: ['Reports'],
        responses: {
          '200': {
            description: 'Financial report data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Report' }
              }
            }
          },
          '403': { description: 'Admin access required' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Movement: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          concept: { type: 'string' },
          amount: { type: 'number', format: 'decimal' },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
          date: { type: 'string', format: 'date-time' },
          userId: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' }
            }
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['ADMIN', 'USER'] },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Report: {
        type: 'object',
        properties: {
          balance: { type: 'number' },
          totalIncome: { type: 'number' },
          totalExpense: { type: 'number' },
          monthlyData: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              properties: {
                income: { type: 'number' },
                expense: { type: 'number' }
              }
            }
          }
        }
      }
    }
  },
  security: [{ BearerAuth: [] }]
};