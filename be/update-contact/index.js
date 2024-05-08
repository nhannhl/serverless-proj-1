const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    console.log('Raw input update data:', event);

    const formData = {
      name: event.name,
      email: event.email,
      subject: event.subject,
      message: event.message,
    };

    await updateItemBySK(formData, event.sk);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Update successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Update failed' }),
    };
  }
};

async function updateItemBySK(item, skVal) {
  const params = {
    TableName: 'formStore',
    Key: {
      pk: 'contactForm',
      sk: skVal,
    },
    ExpressionAttributeNames: {
      "#formData": "formData",
    },
    ExpressionAttributeValues: {
      ":formData": item,
    },
    UpdateExpression: "SET #formData = :formData",
    ReturnValues: "ALL_NEW",
  };

  await dynamodb.update(params).promise();
}
