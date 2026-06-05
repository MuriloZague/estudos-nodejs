import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/usuarios", async (req, res) => {
  let users = [];

  // pesquisa por params (/usuarios?name=murilo)
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
      },
    });
  } else {
  // pesquisa por todos os usuarios (/usuarios)
    const users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.status(201).send(req.body);
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.status(201).send(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: `Usuário deletado com sucesso!` });
});

app.listen(3000);
