// Dados da lista de contatos
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
];

/*
function ValidarInformacoesContato(contato) {
  const { nome, dataNascimento, telefone, email } = contato;
}*/

//function list
function list(request, response) {
  return response.json({ dados: listaContatos });
}

//function create
function create(request, response) {
  const nome = request.body.nome;
  const data = request.body.data;
  const telefone = request.body.telefone;
  const email = request.body.email;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!nome || !data || !telefone || !email) {
    return response
      .status(400)
      .json({ error: "Todos os campos são obrigatórios." });
  }

  function ValidarNome(nome) {
    if (nome.length <= 5) {
      return response.json({
        error: "Nome precisa ter no mínimo 5 caracteres.",
      });
    }
  }

  function ValidarData(data) {
    const dataValidar = /^\d{4}-\d{2}-\d{2}$/;
    if (!data.match(dataValidar)) {
      return {
        error: "Data Inválida.",
      };
    }

    const partesDaData = data.split("-");
    const ano = parseInt(partesDaData[0]);
    const mes = parseInt(partesDaData[1]);
    const dia = parseInt(partesDaData[2]);

    if (
      ano < 1 ||
      ano > 9999 ||
      mes < 1 ||
      mes > 12 ||
      dia < 1 ||
      dia > 31 ||
      (mes === 2 && dia > 29)
    ) {
      return {
        error: "Data Inválida.",
      };
    }

    return {
      success: "Data Válida.",
    };
  }

  function ValidarTelefone(telefone) {
    const telefoneValidar = /^\d[0-9]+$/;
    if (!telefone.match(telefoneValidar)) {
      return response.json({
        error: "Telefone deve conter somente numeros.",
      });
    }
  }

  function ValidarEmail(email) {
    const emailValidar =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailValidar)) {
      return response.json({
        error: "Email Inválido.",
      });
    }
  }

  // Valida os campos
  ValidarNome(nome);
  ValidarData(data);
  ValidarTelefone(telefone);
  ValidarEmail(email);

  const quantidade = listaContatos.length;

  const novoContato = {
    codigo: quantidade + 1,
    nome: nome,
    data: data,
    telefone: telefone,
    email: email,
  };

  listaContatos.push(novoContato);

  return response.json(novoContato);
}

//function update
function update(request, response) {
  const codigo = request.params.codigo;

  let contato = null;

  for (const _contato of listaContatos) {
    if (_contato.codigo == codigo) {
      contato = _contato;
    }
  }

  if (contato == undefined) {
    return response.json({ erro: `Contato #${codigo} não foi encontrado.` });
  }

  const nome = request.body.nome;
  const data = request.body.data;
  const telefone = request.body.telefone;
  const email = request.body.email;

  contato.nome = nome;
  contato.data = data;
  contato.telefone = telefone;
  contato.email = email;

  return response.json(contato);
}

//function destroy
function destroy(request, response) {
  const codigo = request.params.codigo;

  let contato = null;

  for (const [indice, _contato] of listaContatos.entries()) {
    if (_contato.codigo == codigo) {
      contato = _contato;
      // Remove através do índice da lista
      listaContatos.splice(indice, 1);
      break;
    }
  }

  if (contato == null) {
    return response.json({ erro: `Contato #${codigo} não foi encontrado` });
  }

  return response.json(contato);
}

// Module exports sempre no final do arquivo
module.exports = { list, create, update, destroy };
