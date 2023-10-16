import StrapiSDK from "strapi-sdk-js";
import { AuthData } from "../types";
import cache from "@/lib/cache/mcache";

export async function getJWT(
  sdk: StrapiSDK,
  authData: AuthData | boolean
): Promise<string> {
  let user: string, password: string;

  switch (typeof authData) {
    case "object":
      user = authData.user;
      password = authData.password;
      break;

    default:
      user = process.env.STRAPI_USER;
      password = process.env.STRAPI_PASSWORD;
      break;
  }

  let jwt = cache.get<string>(`strapi_jwt_${user}`);

  if (jwt) return jwt;

  ({ jwt } = await sdk
    .login({
      identifier: user,
      password: password,
    })
    .catch((error) => {
      console.log("couldn't authenticate", error);
      return { jwt: "" };
    }));

  if (jwt !== "") cache.set(`strapi_jwt_${user}`, jwt);

  return jwt;
}
