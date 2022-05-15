import { Avalanche } from "avalanche";
import config from "./config.js";

const { host, port, protocol, networkID, username, password } = config;
const avalanche = new Avalanche(host, port, protocol, networkID);
const keystore = avalanche.NodeKeys();

{
  (async () => {
    const successful = await keystore.createUser(username, password);
    console.log("create result", successful);

    const users = await keystore.listUsers();
    console.log("users", users);
  })();
}
