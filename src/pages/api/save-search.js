import fs from "fs/promises";
import path from "path";

let appendStream;

export default async function saveSearch(req, res) {
  const searchString = req.query.s;

  appendStream =
    appendStream ||
    (await fs.open(path.join(".", "logs", "searched-keywords.txt"), "a"));

  appendStream.appendFile(searchString + "\n");

  return res.status(200).json("ok");
}
