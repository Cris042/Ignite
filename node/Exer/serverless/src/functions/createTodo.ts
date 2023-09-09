import { APIGatewayEvent } from 'aws-lambda';
import { document } from '../utils/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handle = async (event: APIGatewayEvent) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  const { user_id } = event.pathParameters;
  const id = uuidV4();

  const todo = {
    id,
    user_id,
    title,
    done: false,
    deadline: new Date(deadline).toUTCString(),
  };

  await document
    .put({
      TableName: 'todos',
      Item: todo,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'ToDo Created!',
      todo: todo,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  };
};
