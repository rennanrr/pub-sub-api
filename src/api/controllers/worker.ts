import service from "../services/Worker";
import amqp from 'amqplib';

const handleMessage = async (message: amqp.Message) => {
  const dataObject: { stringOne: string, stringTwo: string } = JSON.parse(message.content.toString());
  console.log("[Subscriber] Generating concatenation result...");
  //Fake doing a hard math, with timeout function
  setTimeout(() => {
    const response = dataObject.stringOne + dataObject.stringTwo;
    console.log("[Subscriber] Concatenated! - Result: " + response);
    service.sendMessage(response);
  }, 5000);
}

export default { handleMessage };