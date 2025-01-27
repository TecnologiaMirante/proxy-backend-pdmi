const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Habilita CORS (opcional, só para testes locais)
app.use(cors());

// Configura o servidor para entender JSON
app.use(express.json());

// Rota para o proxy
app.post("/get-token", async (req, res) => {
  try {
    // Faz a requisição para o servidor da Microsoft
    const response = await axios.post(
      "https://login.microsoftonline.com/1e6a5fc4-072c-4f6e-bd38-3d312e331366/oauth2/v2.0/token",
      req.body, // Passa o corpo da requisição
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Retorna a resposta da Microsoft para o FlutterFlow
    res.json(response.data);
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
