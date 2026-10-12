import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error("MONGODB_URL .env.local file e nei!");
}

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoDb: Db | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
    global._mongoDb = global._mongoClient.db("nihongobd");
  }
  client = global._mongoClient;
  db = global._mongoDb!;
} else {
  client = new MongoClient(uri);
  db = client.db("nihongobd");
}

export { client, db };
export default client;