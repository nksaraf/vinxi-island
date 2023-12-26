import { TinyBasePartyKitServer } from "tinybase/persisters/persister-partykit-server";
import { Party } from "partykit/server";
import { D1Database } from "@cloudflare/workers-types";
import { appendCorsHeaders } from "h3";
export default class Server extends TinyBasePartyKitServer {
  party: Party & {
    bindings: {
      DB: D1Database;
    };
  };
  constructor(party: Party) {
    super(party);
    this.party = party as any;
  }

  async query(sql: string, params: any[] = []) {
    // let stmt = this.party.bindings.DB.prepare(sql);
    const { results } = await this.party.bindings.DB.prepare(sql)
      .bind(...params)
      .all();
    return results;
  }

  async exec(sql: string, params: any[] = []) {
    // let stmt = this.party.bindings.DB.prepare(sql);
    try {
      const changes = await this.party.bindings.DB.prepare(sql)
        .bind(...params)
        .run();
      return changes;
    } catch (e) {
      console.log(e);
    }
  }
  async onRequest(request: any) {
    if (request.method === "POST") {
      const body = await request.json();
      if (body.action === "query") {
        const result = await this.query(body.sql, body.params ?? []);
        return new Response(JSON.stringify(result), {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "*",
          },
        });
      } else if (body.action === "exec") {
        const result = await this.exec(body.sql, body.params ?? []);
        return new Response(JSON.stringify(result), {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "*",
          },
        });
      }
      if (body.action === "initialize") {
        // DROP all the tables except cloudflare's internal ones
        const sqlSchmea = await this.query(
          `SELECT name FROM sqlite_master WHERE type='table' and name NOT LIKE 'sqlite_%'`
        );

        let tables = sqlSchmea
          .map((table) => table.name)
          .filter((t) => t !== "_cf_KV");

        for (let table of tables) {
          await this.exec(`DROP TABLE IF EXISTS ${table}`);
        }
        await this.exec(`CREATE TABLE IF NOT EXISTS "todos" (
          "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
          "title"	TEXT,
          "completed"	BOOLEAN
        )`);

        await this.exec(`CREATE TABLE IF NOT EXISTS likes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT,
          title TEXT,
          datetime TEXT,
          type TEXT
        )`);

        await this.exec(
          `INSERT INTO likes (url, title, datetime, type) VALUES (
          ?, ?, ?, ?
        )`,
          ["https://google.com", "Google", "2021-01-01", "website"]
        );
        return new Response(null, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "*",
          },
        });
      }
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }
    // console.log(
    //   await this.party.bindings.DB.exec("SELECT * FROM sqlite_master")
    // );
    // let result = await this.query("SELECT * FROM sqlite_master");
    // console.log(result);
    // if
    return super.onRequest(request);
  }
}
