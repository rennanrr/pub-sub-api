import { Request, Response } from "express";
import service from "../services/publisher";

const publish = async (req: Request, res: Response) => {
  try {
    const message = await req.body;

    service.sendMessage(JSON.stringify({string1: message.stringOne, string2: message.stringTwo}));

    res.status(200).json("Sent!");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export default { publish };