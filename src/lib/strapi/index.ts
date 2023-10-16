import StrapiSDK from "strapi-sdk-js";
import { AuthData, StrapiInstance } from "./types";
import { getStrapiSDKInstance } from "./utils/factory";

const strapiSDK = new StrapiSDK({
  url: process.env.NEXT_PUBLIC_STRAPI_URL,
});

let strapi: StrapiInstance = Object.assign(strapiSDK, {
  async auth(authData: AuthData | boolean = true) {
    return getStrapiSDKInstance({ auth: authData });
  },
});

export default strapi;

export { getStrapiSDKInstance };
