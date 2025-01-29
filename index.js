const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs"); // Biblioteca para formatar os dados

const app = express();

// Habilita CORS (se precisar de mais segurança, especifique as origens permitidas)
app.use(cors());

// Configura o servidor para entender JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para suportar x-www-form-urlencoded

// Rota para o proxy
app.post("/get-token", async (req, res) => {
  try {
    // Converte os dados do corpo para x-www-form-urlencoded
    const data = qs.stringify(req.body);

    // Faz a requisição para a Microsoft
    const response = await axios.post(
      "https://login.microsoftonline.com/1e6a5fc4-072c-4f6e-bd38-3d312e331366/oauth2/v2.0/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Retorna a resposta da Microsoft
    res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar token:",
      error.response?.data || error.message
    );

    // Retorna detalhes do erro
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});
