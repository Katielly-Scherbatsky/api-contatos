const Validator = require("validatorjs");
const connection = require("../configs/mysql.config");

/* Dados da lista de contatos
const listaContatos = [
  {
    codigo: 1,
    nome: "Christine Ray",
    data: "2023-02-06",
    telefone: "(284) 901-8328",
    email: "mauris@protonmail.ca",
  },
  {
    codigo: 2,
    nome: "Eagan Hutchinson",
    data: "2023-02-04",
    telefone: "(892) 511-7166",
    email: "eget.odio@icloud.org",
  },
  {
    codigo: 3,
    nome: "Brock Lambert",
    data: "2023-03-09",
    telefone: "1-457-158-4122",
    email: "nullam.vitae.diam@yahoo.org",
  },
  {
    codigo: 4,
    nome: "Craig Vinson",
    data: "2024-06-21",
    telefone: "(437) 598-0259",
    email: "nunc.sed@google.ca",
  },
]; */

// Função que deve receber um identificador (código) e retornar o contato correspondente
function show(req, res) {
  const codigo = req.params.codigo;

  if (codigo == undefined) {
    return res.json({ erro: "Ocorreram erros ao buscar a informação" });
  }

  connection.query(
    "SELECT * FROM contatos WHERE id = ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        return res.json({
          erro: "Ocorreram erros ao tentar salvar a informação",
        });
      }

      if (resultado.length == 0) {
        return res.json({ erro: `O código #${codigo} não foi encontrado!` });
      }

      return res.json(resultado[0]);
    }
  );
}

//function list
function list(request, response) {
  connection.query("SELECT * FROM contatos", function (err, resultado) {
    if (err) {
      return response.json({ erro: "Ocorreram erros ao buscar os dados" });
    }
    return response.json({ dados: resultado });
  });
}

//function create
function create(request, response) {
  const regras = {
    nome: "required|min:5",
    data_nasc: "required|date",
    telefone: "required",
    email: "required|email",
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    return response.json(validacao.errors);
  }

  const nome = request.body.nome;
  const data = request.body.data_nasc;
  const telefone = request.body.telefone;
  const email = request.body.email;

  connection.query(
    "INSERT INTO contatos (nome, data_nasc, telefone, email) VALUES (?, ?, ?, ?)",
    [nome, data, telefone, email],
    function (err, resultado) {
      if (err) {
        return response.json({
          erro: "Ocorreram erros ao tentar salvar a informação",
        });
      }

      if (resultado.affectedRows == 0) {
        return response.json({
          erro: `Ocorreram erros ao tentar salvar a informação`,
        });
      }

      return response.json({
        nome,
        data,
        telefone,
        email,
        id: resultado.insertId,
      });
    }
  );
}

//function update
function update(request, response) {
  const codigo = request.params.codigo;

  const regras = {
    nome: "required|min:5",
    data_nasc: "required|date",
    telefone: "required",
    email: "required|email",
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    return response.json(validacao.errors);
  }

  //buscar o dado no bd
  connection.query(
    "SELECT * FROM contatos WHERE id = ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({ erro: "Ocorreram erros ao buscar os dados" });
      }

      if (resultado.length === 0) {
        return response.json({
          erro: `não foi possivel encontrar o contato`,
        });
      }
      const contato = resultado[0];

      const nome = request.body.nome;
      const data = request.body.data_nasc;
      const telefone = request.body.telefone;
      const email = request.body.email;

      connection.query(
        "UPDATE contatos SET nome = ?, data_nasc = ?, telefone = ?, email = ? WHERE id = ?",
        [nome, data, telefone, email, codigo],
        function (err, resultado) {
          if (err) {
            return response.json({
              erro: "Ocorreu um erro ao tentar atualizar o contato",
            });
          }

          if (resultado.affectedRows === 0) {
            return response.json({
              erro: "Nenhum contato foi atualizado",
            });
          }
          return response.json({
            nome,
            data,
            telefone,
            email,
            id: resultado.insertId,
          });
        }
      );
    }
  );
}

//function destroy
function destroy(request, response) {
  const codigo = request.params.codigo;

  connection.query(
    "DELETE FROM contatos WHERE id= ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({
          erro: "Ocorreu um erro ao tentar excluir o contato",
        });
      }

      if (resultado.affectedRows === 0) {
        return response.json({
          erro: `Contato #${codigo} não foi encontrado`,
        });
      }

      return response.json({
        mensagem: `Contato ${codigo} foi deletado com sucesso`,
      });
    }
  );
}

// Module exports sempre no final do arquivo
module.exports = { show, list, create, update, destroy };
