'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.email !== 'string' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#customer_email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': data.email,
      ':firstname': data.firstname,
      ':lastname': data.lastname,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #customer_email = :email, firstname = :firstname,lastname = :lastname, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

 
  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
