const express = require("express");

const app = express();

// Rota principal
app.get("/", function (request, response) {
  response.send("API Funcionando...");
});

// Iniciando a aplicação na porta 3000
app.listen(3000, function () {
  console.log("API iniciada na porta: 3000");
});
