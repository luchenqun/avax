import { Avalanche } from "avalanche";
import config from "./config.js";

const { host, port, protocol, networkID, username, password, privateKey } = config;
const avalanche = new Avalanche(host, port, protocol, networkID);
const keystore = avalanche.NodeKeys();

const pchain = avalanche.PChain();
const xchain = avalanche.XChain();
const cchain = avalanche.CChain();

{
  (async () => {
    const users = await keystore.listUsers();
    console.log("users", users);

    if (!users.includes(username)) {
      const successful = await keystore.createUser(username, password);
      console.log("create result", successful);
    }
    console.log(await xchain.importKey(username, password, privateKey));
    console.log(await cchain.importKey(username, password, privateKey));
    console.log(await cchain.importKey(username, password, "PrivateKey-STjN5PYzi8UJyCfbkmdzRzhGmQSneo9BGHRFMjGeZjYH1djUM"));
    console.log(await pchain.importKey(username, password, privateKey));
  })();
}
