const axios = require("axios");
const qs = require("qs");

module.exports = async function (req, res) {
  // Adicione o cabeçalho CORS
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://pdmi-mirante.flutterflow.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const data = qs.stringify(req.body);

    // POST
    const response = await axios.post(
      "https://login.microsoftonline.com/1e6a5fc4-072c-4f6e-bd38-3d312e331366/oauth2/v2.0/token",
      data,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar token:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
};
