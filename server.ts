import { writeFile } from "fs/promises";
import { join } from "path";
import { Database } from "bun:sqlite";

let db;
async function initializeDatabase() {
  db = new Database(":memory:");
  // db = await open({
  //   filename: join(__dirname, "data.db"),
  //   driver: Database,
  // });

  await db.run(`CREATE TABLE IF NOT EXISTS captures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT,
    datetime TEXT
  )`);
}

initializeDatabase();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Specify allowed methods
  response.headers.set("Access-Control-Allow-Headers", "*"); // Specify allowed headers
}

Bun.serve({
  port: 5555,
  async fetch(request) {
    if (request.method === "OPTIONS") {
      console.log("hereee");
      const response = new Response(null, { status: 204 });
      setCorsHeaders(response);
      return response;
    }

    if (
      request.method === "POST" &&
      new URL(request.url).pathname === "/upload"
    ) {
      const response = await handleUpload(request);
      setCorsHeaders(response);

      return response;
    }

    // Default response for other requests
    const response = new Response("Bun server is running", {
      status: 200,
    });
    setCorsHeaders(response);

    return response;
  },
});

async function handleUpload(request) {
  try {
    const formdata = await request.formData();
    const proc = Bun.spawnSync([
      "screenshot",
      "Arc",
      // "--all_windows",
      "--filename",
      // "--all_windows",

      join(__dirname, "screenshot.png"),
    ]);
    const text = await new Response(proc.stdout).text();
    console.log(text);
    // const data = await request.json();
    // console.log(data);

    // // Saving the image
    // const imageBase64 = data.image.split(";base64,").pop();
    // const imageBuffer = Buffer.from(imageBase64, "base64");

    // // Writing the byte array to a file
    // await writeFile(join(__dirname, "screenshot.png"), imageBuffer);

    // // Saving other data to SQLite database
    // await db.run(
    //   `INSERT INTO captures (url, title, datetime) VALUES (?, ?, ?)`,
    //   [data.url, data.title, data.datetime]
    // );

    return new Response("Data received and file saved", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error handling the request", {
      status: 500,
    });
  }
}
