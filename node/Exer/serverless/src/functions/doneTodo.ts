import { APIGatewayEvent } from 'aws-lambda';
import { document } from '../utils/dynamodbClient';

export const handle = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters;

  const getTodo = async (id: string) => {
    const response = await document
      .query({
        TableName: 'todos',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id,
        },
      })
      .promise();
    return response.Items[0];
  };

  const todo = await getTodo(id);

  if (todo) {
    await document
      .update({
        TableName: 'todos',
        Key: {
          id: id,
        },
        UpdateExpression: 'set done = :true',
        ExpressionAttributeValues: {
          ':true': true,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();

    const updatedTodo = await getTodo(id);

    return {
      statusCode: 201,
      body: JSON.stringify(updatedTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid ToDo!',
    }),
  };
};
