import { getSinglePost } from "./../../helpers/posts";
("use strict");
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";
import * as middy from "middy";
import { cors } from "middy/middlewares";

const logger = createLogger("handler");

export const handler = middy(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const postId = event.pathParameters.postId;
    logger.info("getting single post", { postId });

    const userId = getUserId(event);
    const post = await getSinglePost(postId, userId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allowed-Origin": "*",
      },
      body: JSON.stringify(post),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
