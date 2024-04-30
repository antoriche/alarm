import * as hello from "./hello";

const model = { ...hello };

export type RPCModel = typeof model;

export default model;
