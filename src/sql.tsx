import { useSuspenseQuery } from "@tanstack/react-query";
import { PARTYKIT_HOST } from "./brain";

// import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
// const getDB = cache(async () => {
//   const sqlite3 = await sqlite3InitModule({
//     locateFile: (file) => {
//       console.log("Loading SQLite3 file", file);
//       return chrome.runtime.getURL(`/assets/${file}`);
//     },
//     print: console.log,
//     printErr: console.error,
//   });
//   const db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
//   return db;
// });
// console.log(await getDB());
export function useSQL(sql: string, params: any[]) {
  return useSuspenseQuery({
    queryKey: [sql, params],
    queryFn: async () => {
      // fetch(`https://${PARTYKIT_HOST}/parties/main/${roomId}`, {
      //   method: "POST",
      //   body: JSON.stringify({ message: "Hello!" }),
      // });
      const res = await fetch(`http://${PARTYKIT_HOST}/parties/main/brain`, {
        method: "POST",
        body: JSON.stringify({ sql, action: "query", params }),
      });
      return await res.json();
    },
  }).data;
}
