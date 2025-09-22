import express from "express";
import dotenv from "dotenv";
import registrosRoutes from "./src/routes/registrosRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const serverPort = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.send("Servidor funcionando...🆙");
    
});

app.use("/registros", registrosRoutes);

app.listen( serverPort, () => {
    console.log(`Servidor rodando em http://localhost:${serverPort}`);
});