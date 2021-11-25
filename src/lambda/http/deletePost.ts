import { deletePost } from "./../../helpers/posts";
("use strict");
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";
import * as middy from "middy";
import { cors } from "middy/middlewares";

const logger = createLogger("handler");

export const handler = middy(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    logger.info("deleting post", { event });
    const postId = event.pathParameters.postId;
    const userId = getUserId(event);
    await deletePost(postId, userId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allowed-Origin": "*",
      },
      body: JSON.stringify({}),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
