import PubNubReact from "pubnub-react";
import {SUB_KEY} from "../constants";

const initPubNub = (host) => {
  const pubnub = new PubNubReact({ subscribeKey: SUB_KEY });
  pubnub.init(host);

  return pubnub;
}

export {
  initPubNub
}