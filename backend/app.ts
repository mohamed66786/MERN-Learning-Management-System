import express from "express";
export const app= express();
import cors from "cors";
import cookieParser from "cookie-parser";

// body Parser
app.use(express.json({limit:"50mb"}));
// cookie parser
