import { GetInstanceOptions } from "../types";
import { getJWT } from "./authentication";
import StrapiSDK from "strapi-sdk-js";

export async function getStrapiSDKInstance(
  options: GetInstanceOptions = {}
): Promise<StrapiSDK> {
  const { url, auth } = options;
  const strapiSDK = new StrapiSDK({
    url: url || process.env.NEXT_PUBLIC_STRAPI_URL,
  });

  if (auth) {
    const jwt = await getJWT(strapiSDK, auth);

    strapiSDK.axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  return strapiSDK;
}
