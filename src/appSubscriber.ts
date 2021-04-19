import config from './api/config/config';
import Subscriber from './api/services/Subscriber';
import Worker from './api/services/Worker';

const server = async () => {
  await Subscriber.listenQueueNotify();

  Worker;
}

export default server();