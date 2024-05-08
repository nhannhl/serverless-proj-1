const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  try {
    console.log('Raw input data:', event);

    const formData = {
      name: event.name,
      email: event.email,
      subject: event.subject,
      message: event.message,
    };

    const item = {
      pk: 'contactForm',
      sk: generateUUID(),
      formData,
    };

    // Store the form data in DynamoDB
    await storeFormData(item);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submitted successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Submission failed' }),
    };
  }
};

async function storeFormData(item) {
  const params = {
    TableName: 'formStore',
    Item: item,
  };
  
  await dynamodb.put(params).promise();
}

function generateUUID() {
  return uuidv4();
}