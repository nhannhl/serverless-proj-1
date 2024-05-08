const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    console.log('Raw input data:', event);

    await deleteItemBySK(event.sk);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Delete successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Delete failed' }),
    };
  }
};

async function deleteItemBySK(skVal) {
  const params = {
    TableName: 'formStore',
    Key: {
      pk: 'contactForm',
      sk: skVal,
    },
  };
  
  await dynamodb.delete(params).promise();
}
