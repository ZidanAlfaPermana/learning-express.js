import express from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", routes);

app.listen(process.env.PORT_API ?? 3000, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT_API ?? 3000}`);
});