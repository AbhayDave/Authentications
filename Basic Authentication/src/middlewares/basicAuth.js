// Please don't change the pre-written code

import { getAllUsers } from "../features/user/model/user.model.js";

// Import the necessary modules here

const basicAuthMiddleware = (req, res, next) => {
  // Write your code here
  const authheader = req.headers.authorization;

  console.log(authheader);

  if (!authheader) {
    res.status(401).send("No Authoriazation Details Found");
  }

  const base64Credentials = authheader.replace('Basic ', '');

  console.log(base64Credentials);

  const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf8');

  console.log(decodedCredentials);

  const creds = decodedCredentials.split(":")

  console.log(creds);

  const user = getAllUsers().find(u => u.email == creds[0] && u.password == creds[1]);

  if (!user) {
    res.status(401).send("Incorrect Credentials");
  } else {
    next();
  }

};

export default basicAuthMiddleware;
