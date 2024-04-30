import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import rpc from "./rpc/index";
import { handleRpc, isJsonRpcRequest } from "typed-rpc/server";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = event.body && JSON.parse(event.body);
  if (!isJsonRpcRequest(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Not a Rpc request" })
    };
  }
  const res = await handleRpc(body, rpc);

  return {
    statusCode: 200,
    body: JSON.stringify(res),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
