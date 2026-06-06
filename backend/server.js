import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

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
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //validacoes basicas sem zod/prisma
  if (req.body.name === ""){
    res.status(400).send({message: "falta nome!"})
    return
  } else if (isNaN(req.body.age)) {
    res.status(400).send({message: "idade incorreta!"})
    return
  } else if (!regexEmail.test(req.body.email)){
    res.status(400).send({message: "preencha um email valido!"})
    return
  } else if ((req.body.password).length < 6){
    res.status(400).send({message: "senha precisa ter no minimo 6 caracteres!"})
    return
  }

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
