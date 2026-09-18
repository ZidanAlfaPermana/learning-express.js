import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import { appThrottle, assignRequestId, requestLogger } from "./middlewares/middleware";

import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(assignRequestId);
app.use(appThrottle);

app.use("/api", routes);
app.use(errorHandler);

app.listen(process.env.PORT_API ?? 3000, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT_API ?? 3000}`);
});