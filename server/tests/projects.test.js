// teste unitário

const { removeDuplicates } = require('../controllers/projectsControl');

describe('removeDuplicates', () => {
  it('deve remover itens duplicados com o mesmo _id', () => {
    const input = [
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
      { _id: '1', name: 'Project A (duplicate)' },
    ];

    const output = removeDuplicates(input);

    expect(output).toEqual([
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
    ]);
  });

  it('deve retornar um array vazio se a entrada for vazia', () => {
    const input = [];
    const output = removeDuplicates(input);
    expect(output).toEqual([]);
  });

  it('deve manter o array sem alteração se não houver duplicados', () => {
    const input = [
      { _id: '1', name: 'Project A' },
      { _id: '2', name: 'Project B' },
    ];

    const output = removeDuplicates(input);

    expect(output).toEqual(input);
  });
});



const request = require('supertest');
const app = require('../index'); // Supondo que seu servidor esteja em index.js
const models = require('../models/model');
const User = models.User;

// Mock das funções do Mongoose (para simular interações com o banco)
jest.mock('../models/model');

describe('User API', () => {
  let userId;

  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.resetAllMocks();
  });

  it('should create a new user', async () => {
    // Mock para simular a criação de um usuário
    User.prototype.save = jest.fn().mockResolvedValue({
      id: '12345',
      name: 'John Doe',
      description: 'Test user',
    });

    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        description: 'Test user',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('John Doe');
    userId = res.body.id;

    // Verifica se o método save foi chamado corretamente
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
  });

  it('should list all users', async () => {
    // Mock para simular a listagem de usuários
    User.find = jest.fn().mockResolvedValue([
      { id: '12345', name: 'John Doe', description: 'Test user' },
    ]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a user by ID', async () => {
    // Mock para simular a busca de um usuário por ID
    User.findById = jest.fn().mockResolvedValue({
      id: userId,
      name: 'John Doe',
      description: 'Test user',
    });

    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    // Mock para simular a atualização de um usuário
    User.findByIdAndUpdate = jest.fn().mockResolvedValue({
      id: userId,
      name: 'John Doe',
      description: 'Updated user',
      is_admin: true,
    });

    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .send({
        is_admin: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('is_admin', true);
    expect(res.body.description).toEqual('Updated user');
  });

  it('should delete a user', async () => {
    // Mock para simular a exclusão de um usuário
    User.findByIdAndDelete = jest.fn().mockResolvedValue({
      id: userId,
      name: 'John Doe',
      description: 'Test user',
    });

    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', 'Bearer token'); // Simulando o cabeçalho de autorização

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});


//TENTAMOS FAZER AS SUITES, PORÉM NÃO DE CERTO!

