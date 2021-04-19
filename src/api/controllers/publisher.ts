import { Request, Response } from "express";
import Service from "../services/publisher";

const publish = async (req: Request, res: Response) => {
  try {
    const message = await req.body;
    const send = await Service.publishMessage({stringOne: message.stringOne, stringTwo: message.stringTwo});
    if (send) res.status(200).json(send);
    else res.status(300).json(send);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export default { publish };