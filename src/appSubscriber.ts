import Subscriber from './api/services/Subscriber';
import Worker from './api/services/Worker';

const server = async () => {
  await Subscriber.init();

  Worker;
}

export default server();