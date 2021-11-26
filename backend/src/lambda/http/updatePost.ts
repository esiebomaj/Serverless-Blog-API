("use strict");
import { updatePost } from "./../../helpers/posts";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";
import * as middy from "middy";
import { cors } from "middy/middlewares";

const logger = createLogger("handler");

export const handler = middy(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    logger.info("deleting post", { event });
    const post = JSON.parse(event.body);
    const postId = event.pathParameters.postId;
    const userId = getUserId(event);
    await updatePost(post, postId, userId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
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
