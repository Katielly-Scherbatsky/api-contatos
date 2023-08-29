const express = require("express");

const app = express();

// Rota principal
app.get("/", function (request, response) {
  return response.send("API Funcionando...");
});

app.get("/Autor", function (request, response) {
  return response.send("Autor: Katielly");
});

app.get("/sobre", function (repost, response) {
  const info = {
    nome: "Katielly Bordin Santos",
    email: "katielly@gmail.com",
    telefone: "(69) 99999-9999",
  };
  return response.json(info);
});

// Iniciando a aplicação na porta 3000
app.listen(3000, function () {
  console.log("API iniciada na porta: 3000");
});
