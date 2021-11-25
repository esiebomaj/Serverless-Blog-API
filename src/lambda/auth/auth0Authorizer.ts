import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda";
import "source-map-support/register";

// import { verify } from "jsonwebtoken";
// import { createLogger } from "../../utils/logger";
// import { JwtPayload } from "../../auth/JwtPayload";

// const logger = createLogger("auth");

// const RSACert = `
// -----BEGIN CERTIFICATE-----
// MIIDDTCCAfWgAwIBAgIJfFxo6KoovqSyMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
// BAMTGWRldi1nOHg4ZTFlZy51cy5hdXRoMC5jb20wHhcNMjExMTIwMTUyNzI5WhcN
// MzUwNzMwMTUyNzI5WjAkMSIwIAYDVQQDExlkZXYtZzh4OGUxZWcudXMuYXV0aDAu
// Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxXF5XXSm3PMrLcHR
// FVNbsviSkm3bWlXwI1jQyNh9w9x0GfxYE5iB5IAHcN7Uf4ht3xw0f/6xIXCYJFVU
// fGLzCSbsza462Gn2zA4cpTiNzf3QNpThF58Kn86sNEj1hXOl3/oM/7GWTn/b9P8w
// lUxVmSvsRJEAgRhKhTeuvW7svnbsaQ2XobxpBHs/ampc050/p+ZPRhGrT81Py4eU
// m3DLrhU42obm6B+qoB+Uf+7+Ahc+HzT//oWpXMXmzq37hueRBh8NgfTnMYL4zZ5B
// Q/tbZnRnAnwrG/t52EtSrZTtl0tgvgNw6c6zfqbJNiFe9x1X4kSttRJa3HLFoG1e
// GQD36QIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSTt8kBYUZL
// iDSY6paoo1lsFG8ipjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
// AFR6WaA5pKrcruTKKZ8vIPY0KafBNWWsBof5y4v+5ysVxXCs7ydUs8vYasoCkVb+
// BaYM+g1/2/5smP7vGAv/CfH2C8U7U7wjfVGYefOAa5oe7oKW5td/g3YofdyNzwxp
// +WMWpIqBkt2+UeQkSydGSKU60xDVTu2myhF+fT0Mlf7GFABGJLBbf5p5HU+XH0XJ
// kiicCEyVf25DDiQJYs0RcQn2AD95Xhj3E45XAD3MJDNSVzU4dZVDTxa2lRY/V/Bj
// hrR2DM3qntlcSFr1uqS1Bhw/xSxAXfTWzKdLcuNZHwKg2wvIvUVWMB9ASyY+l00+
// 2/zLbqK4eX7AN1pOdx2SnQM=
// -----END CERTIFICATE-----
// `;

// export const handler = async (
//   event: CustomAuthorizerEvent
// ): Promise<CustomAuthorizerResult> => {
//   logger.info("Authorizing a user", event.authorizationToken);
//   try {
//     const jwtToken = await verifyToken(event.authorizationToken);
//     logger.info("User was authorized", jwtToken);

//     return {
//       principalId: jwtToken.sub,
//       policyDocument: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Action: "execute-api:Invoke",
//             Effect: "Allow",
//             Resource: "*",
//           },
//         ],
//       },
//     };
//   } catch (e) {
//     logger.error("User not authorized", { error: e.message });

//     return {
//       principalId: "user",
//       policyDocument: {
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Action: "execute-api:Invoke",
//             Effect: "Deny",
//             Resource: "*",
//           },
//         ],
//       },
//     };
//   }
// };

// async function verifyToken(authHeader: string): Promise<JwtPayload> {
//   const token = getToken(authHeader);
//   const verified = verify(token, RSACert, { algorithms: ["RS256"] });
//   return verified as JwtPayload;
// }

// function getToken(authHeader: string): string {
//   if (!authHeader) throw new Error("No authentication header");

//   if (!authHeader.toLowerCase().startsWith("bearer "))
//     throw new Error("Invalid authentication header");

//   const split = authHeader.split(" ");
//   const token = split[1];

//   return token;
// }

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  console.log("Fake Authorizing a user", event);
  return {
    principalId: "guest user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "*",
        },
      ],
    },
  };
};
