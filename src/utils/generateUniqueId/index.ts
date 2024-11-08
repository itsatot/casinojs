//@collapse

import crypto from "crypto";

function generateUniqueId(): string {
  return crypto.randomBytes(16).toString("hex");
}

export { generateUniqueId };
