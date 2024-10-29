import crypto from "crypto";

function generateUniqueId() {
  return crypto.randomBytes(16).toString("hex");
}

export default generateUniqueId;
