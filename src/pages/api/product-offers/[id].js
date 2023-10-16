// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";
import createMetascraper from "metascraper";
import metascraperShopping from "@samirrayani/metascraper-shopping";
import strapi from "@/lib/strapi";
import { Agent } from "https";

const metascraper = createMetascraper([metascraperShopping()]);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(400);

  let { offers: incompleteOffers } = await findProduct(req.query.id);

  let completeOffersPromise = incompleteOffers.map((incompleteOffer) => {
    const offer = { ...incompleteOffer, isAvailable: false, microdata: {} };
    if (incompleteOffer.url.toLowerCase() === "whatsapp") {
      return new Promise((resolve) =>
        resolve({
          ...offer,
          isAvailable: true,
        })
      );
    } else {
      return scrapOffer(offer);
    }
  });

  res.json(await Promise.all(completeOffersPromise));
}

const findProduct = (id) => {
  return strapi.auth().then((strapi) =>
    strapi
      .findOne("products", id, {
        populate: ["offers.store.logo"],
      })
      .then((res) => res.data)
  );
};

function scrapOffer(offer) {
  return fetch(offer.url, {
    agent: new Agent({ rejectUnauthorized: false }),
  })
    .then(async (res) => {
      if (res.status === 200) {
        let html = await res.text();

        offer.microdata = await metascraper({ html, url: offer.url });
        offer.isAvailable = true;
      }

      return offer;
    })
    .catch(() => ({ ...offer }));
}
