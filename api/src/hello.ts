import { HelloRequest } from "shared/Hello";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { azureWrapper } from "./helpers/azureWrapper";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name } = (event.queryStringParameters || {}) as HelloRequest;
  /* const database = await getDB();
  let query = database.from("table").select("*");
  database.destroy(); */
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${name || "World"}` }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const azureHandler = azureWrapper(handler);
