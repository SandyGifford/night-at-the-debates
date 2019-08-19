console.clear();

import express from "express";
import routing from "./routing";

const app = express();
app.use(routing);

export default app;
