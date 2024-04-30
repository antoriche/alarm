import { APIGatewayProxyEvent } from "aws-lambda";

export const required_attribute = (attribute: string, queryStringParameters: { [key: string]: unknown }) => {
  if (queryStringParameters[attribute] === undefined) {
    throw new Error(`${attribute} is required`);
  }
};

export const extractUserFromRequest = (event: APIGatewayProxyEvent): { userName: string | undefined } => {
  const claims = event?.requestContext?.authorizer?.claims;
  const userName = claims["cognito:username"];
  return { userName };
};
