const dbClient = require('../database/db')
const Sequelize = require('sequelize');
const scrapeRequestsCreationFunction = require('../../models/scraperequests');
const { SendMessageCommand, SQSClient } = require("@aws-sdk/client-sqs")

const client = new SQSClient({});
const SQS_QUEUE_URL = "shttps://sqs.sa-east-1.amazonaws.com/521101151519/scrape-request-queue.fifo"

async function queueSendMessage(sqsQueueUrl , scrapeRequestInfo) {
    console.log("[queueSendMessage] - Vamos enviar a fila")
    const command = new SendMessageCommand({
        QueueUrl: sqsQueueUrl,
        MessageGroupId: 1,
        MessageBody:
          JSON.stringify(scrapeRequestInfo),
      });
    
      const response = await client.send(command);
      console.log(response);
      return response;
}

module.exports.handler = async (event) => {
    console.log("[ScrapeRequest HANDLER] - Event: ", event)
    const { url } = JSON.parse(event.body)

    await dbClient.connect();
    const ScrapeRequests = scrapeRequestsCreationFunction(dbClient.sequelize, Sequelize)

    const scrapeRequestInfo = {
        url,
        status: "pending",   
    }
    const { dataValues : { requestId } } = await ScrapeRequests.create(scrapeRequestInfo);
    
    const response = await queueSendMessage(SQS_QUEUE_URL, {...scrapeRequestInfo, requestId})

    console.log("[ScrapeRequest HANDLER] - URL received. Scrape request has successfully sended to queue", { requestId} )

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                status: 'pending',
                message: `URL received. Request has successfully sended to queue.`,
                url,
                response
            },
        ),
    };
};


