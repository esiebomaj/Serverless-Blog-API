("use strict");
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { getAllPosts } from "../../helpers/posts";
import { createLogger } from "../../utils/logger";

const logger = createLogger("handler");

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("getting all posts", { event });
  const posts = await getAllPosts();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allowed-Origin": "*",
    },
    body: JSON.stringify(posts),
  };
};
