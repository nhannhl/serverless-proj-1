const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const item = {
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": 'contactForm'
      }
    };

    const data = await getData(item);
    console.log("Test data query:", JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Get successfully', data: data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Get failed' }),
    };
  }
};

async function getData(item) {
  const params = {
    TableName: 'formStore',
    ...item
  };
  
  return await dynamodb.query(params).promise();
}