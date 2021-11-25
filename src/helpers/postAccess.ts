import { PostUpdate } from "../models/PostUpdate";
import * as AWS from "aws-sdk";
const AWSXRay = require("aws-xray-sdk");
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PostItem } from "../models/PostItem";
import { createLogger } from "../utils/logger";

const XAWS = AWSXRay.captureAWS(AWS);

const logger = createLogger("PostAccess");

//  dataLayer logic

export class PostAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly postTable = process.env.POST_TABLE
  ) {}

  async getAllPosts(): Promise<PostItem[]> {
    console.log("Getting all posts");
    logger.info("Getting all posts");

    const result = await this.docClient
      .scan({
        TableName: this.postTable,
      })
      .promise();

    const items = result.Items;
    return items as PostItem[];
  }

  async getSinglePost(postId: string, userId: string): Promise<PostItem> {
    console.log("Getting single post");
    logger.info("Getting single pos", { postId });

    const result = await this.docClient
      .get({
        TableName: this.postTable,
        Key: {
          postId,
          userId,
        },
      })
      .promise();

    const items = result.Item;
    return items as PostItem;
  }

  async createPostItem(post: PostItem): Promise<PostItem> {
    logger.info("Creating new post", {
      title: post.title,
      postId: post.postId,
    });
    await this.docClient
      .put({
        TableName: this.postTable,
        Item: post,
      })
      .promise();

    return post;
  }

  async updatePostItem(post: PostUpdate, postId: string, userId: string) {
    logger.info("Updating post", { postId });
    const params = {
      TableName: this.postTable,
      Key: {
        userId: userId,
        postId: postId,
      },
      UpdateExpression: "set #bodyAtt=:a, #titleAtt=:n",
      ExpressionAttributeValues: {
        ":n": post.title,
        ":a": post.body,
      },
      ExpressionAttributeNames: {
        "#titleAtt": "title",
        "#bodyAtt": "boby",
      },
      ReturnValues: "UPDATED_NEW",
    };
    await this.docClient.update(params).promise();
  }

  async deletePostItem(postId: string, userId: String) {
    logger.info("Deleting post", { postId });
    const params = {
      TableName: this.postTable,
      Key: {
        userId: userId,
        postId: postId,
      },
    };

    await this.docClient.delete(params).promise();
  }
}

function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient();
}
