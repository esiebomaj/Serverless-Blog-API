import { getAttachmentUrl, getSignedUrl } from "./../../helpers/signedUrl";
import { createNewPost } from "./../../helpers/posts";
("use strict");
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../../utils/logger";
import * as uuid from "uuid";
import { getUserId } from "../utils";
import * as middy from "middy";
import { cors } from "middy/middlewares";

const logger = createLogger("handler");

export const handler = middy(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    logger.info("creating new post", { event });
    const body = JSON.parse(event.body);
    const postId = uuid.v4();
    const userId = getUserId(event);
    const createdAt = new Date().toISOString();
    const attachmentUrl = getAttachmentUrl(postId);

    const newPost = { postId, userId, createdAt, attachmentUrl, ...body };
    const uploadUrl = await getSignedUrl(postId);

    await createNewPost(newPost);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ newPost, uploadUrl }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
