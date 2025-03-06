import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.post('/users', async (req, res) => {
  const { email, name, age } = req.body;

  await prisma.user.create({
    data: {
      email: email,
      name: name,
      age: age,
    },
  });

  res.status(201).send(req.body);
});

app.put('/users/:id', async (req, res) => {
  const { email, name, age } = req.body;
  const { id } = req.params;

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
      name: name,
      age: age,
    },
  });

  res.status(201).send(req.body);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({ message: 'Usuário deletado com sucesso!' });
});

app.listen(3000);
