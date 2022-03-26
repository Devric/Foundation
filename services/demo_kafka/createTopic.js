const kafka = require('./kafka').default

const TOPIC = 'test'

// create the kafka topic where we are going to produce the data
const createTopic = async () => {
  try {
    const topicExists = (await kafka.admin().listTopics()).includes(TOPIC);
    if (!topicExists) {
      await kafka.admin().createTopics({
        topics: [
          {
            topic: TOPIC,
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// createTopic()
exports.default = createTopic
