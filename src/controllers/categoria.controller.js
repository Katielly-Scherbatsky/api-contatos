const Validator = require("validatorjs");
const connection = require("../configs/mysql.config");

/**
 * Função que deve receber um identificador (código)
 * e retornar o categoria correspondente
 */
function show(req, res) {
  const codigo = req.params.codigo;

  if (codigo == undefined) {
    return res.json({ erro: "Ocorreram erros ao buscar a informação" });
  }

  connection.query(
    "SELECT * FROM categoria WHERE id = ?",
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

function list(request, response) {
  connection.query("SELECT * FROM categorias", function (err, resultado) {
    if (err) {
      return response.json({ erro: "Ocorreram erros ao buscar os dados" });
    }
    return response.json({ dados: resultado });
  });
}

function create(request, response) {
  const regras = {
    nome: "required|min:5",
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    return response.json(validacao.errors);
  }

  const { nome } = request.body;

  connection.query(
    "INSERT INTO categoria (nome) VALUES (?)",
    [nome],
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
        id: resultado.insertId,
      });
    }
  );
}

function update(request, response) {
  const codigo = request.params.codigo;

  //buscar o dado no bd
  connection.query(
    "SELECT * FROM categoria WHERE id = ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({ erro: "Ocorreram erros ao buscar os dados" });
      }

      if (resultado.length === 0) {
        return response.json({
          erro: `não foi possivel encontrar a categoria`,
        });
      }
      const categoria = resultado[0];

      const nome = request.body.nome;

      connection.query(
        "UPDATE categoria SET nome = ? WHERE id = ?",
        [nome, codigo],
        function (err, resultado) {
          if (err) {
            return response.json({
              erro: "Ocorreu um erro ao tentar atualizar a categoria",
            });
          }

          if (resultado.affectedRows === 0) {
            return response.json({
              erro: "Nenhuma categoria foi atualizado",
            });
          }
          return response.json({
            nome,
            id: resultado.insertId,
          });
        }
      );
    }
  );
}

function destroy(request, response) {
  const codigo = request.params.codigo;

  connection.query(
    "DELETE FROM categoria WHERE id= ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({
          erro: "Ocorreu um erro ao tentar excluir a categoria",
        });
      }

      if (resultado.affectedRows === 0) {
        return response.json({
          erro: `categoria #${codigo} não foi encontrado`,
        });
      }

      return response.json({
        mensagem: `categoria ${codigo} foi deletada com sucesso`,
      });
    }
  );
}

module.exports = { show, list, create, update, destroy };