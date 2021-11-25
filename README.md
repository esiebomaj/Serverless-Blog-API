# Serverless Blog

A simple blog application backend built with serverless on AWS

## Technologies Used

**Languages**: Typescript, NodeJs
**Framework**: Serverless Framework, Auth0/OAuth
**AWS services**: AWS Lambda, APIGateWay, CloudFormation, S3, CloudWatch, DynamoDB, AWS X-ray,

## Features

- Authentication with Auth0/OAuth
- Uplaod Blog images to S3
- CRUD operation for blog posts with DynamoDb
- Distributed tracing, logging with CloudWatch and AWS X-ray for observability

## Endpoints

- Get all post - GET - https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/posts
- Create New post - POST - https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/posts
- Get single Post - GET - https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/posts/{postId}
- Update Post - PATCH - https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/posts/{postId}
- Delete Post - DELETE - https://ymko4gph3g.execute-api.us-east-1.amazonaws.com/dev/posts/{postId}
