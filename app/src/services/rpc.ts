import { rpcClient } from "typed-rpc";

import type { RPCModel } from "shared/rpc";
import { shouldSkipAuth } from "../App";
import { Auth } from "aws-amplify";

const client = rpcClient<RPCModel>({
  url: `${process.env.REACT_APP_API_URL}/rpc`,
  async getHeaders() {
    let token = "";
    if (!shouldSkipAuth) {
      const session = await Auth.currentSession();
      token = session.getIdToken().getJwtToken();
    }
    return {
      Authorization: token && `Bearer ${token}`,
    };
  },
});

const rpc = client;
export default rpc;
