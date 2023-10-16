import { NextApiRequest, NextApiResponse } from "next";
import { contactCreationDataSchema } from "@/lib/keap/types";
import { saveContact } from "@/lib/keap";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedBody = contactCreationDataSchema.parse(req.body);

  try {
    if (process.env.NODE_ENV !== "development") {
      await saveContact(parsedBody);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ error: error });
  }
}
