const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const generateAdmin = async () => {
  const id = uuidv4(); // Prisma 中定義的 uuid()
  const username = "admin";
  const password = "yjo4el g3m/45k3";
  const hashed = await bcrypt.hash(password, 10);

  const isAdmin = true;

  const sql = `
INSERT INTO "User" (id, username, password, "isAdmin")
VALUES ('${id}', '${username}', '${hashed}', ${isAdmin});
  `.trim();

  console.log("🔐 Your hashed password:\n", hashed);
  console.log("\n🧾 Your SQL insert:\n", sql);
};

generateAdmin();
