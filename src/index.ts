import express, { Request, Response } from "express";

const app = express();
const port = 3100;

app.get("/", (req: Request, res: Response) => {

    const response = {
        message: "Hi"
    }

  res.json(response);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});