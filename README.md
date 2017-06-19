# Serverless REST API

This example demonstrates how to setup a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete customer record. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the customer operations. For each operation exactly one file exists e.g. `customer/delete.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

The idea behind the `customer` directory is that in case you want to create a service containing multiple resources e.g. users, notes, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash

Step 1: Install node.js 

> https://nodejs.org/en/ 

> npm install npm@latest –g 

Step 2: Install Serverless 

> npm install -g Serverless

> serverless --version 

Note: If you have already access key set up in your laptop then Step 5 & 6 steps are not needed 

Step 3: Create AWS Account & download credential file for Access key 

https://aws.amazon.com/console/

Step 4: If you already have Root account then generate access key from Security tab from User tab and save csv file in local 

step:5: create Alexa Account 

https://developer.amazon.com/alexa 

```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stage/customer--data  '{	"firstname": "bill",	"lastname" : "ott",	"email" : "billdott@gmail.com"}'

```

### List all Todos

```bash
curl https://XXXXXXX.execute-api.us-west-2.amazonaws.com/stage/customer

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl https://XXXXXXX.execute-api.us-west-2.amazonaws.com/stage/customer/<id>
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT https://XXXXXXX.execute-api.us-west-2.amazonaws.com/stage/customer<id> --data '{  "firstname": "bill",
  "lastname": "ott",
  "email": "billdott@gmail.com"
}'
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stage/customer/<id>
```
Msg: recrod deleted sucessfully

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in 
[To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```

In case you expect a lot of traffic fluctuation we recommend to 
checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)
