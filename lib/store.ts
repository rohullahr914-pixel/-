import { promises as fs } from "node:fs";
import path from "node:path";
import type { Database, Order, Product, SiteSettings } from "./types";
const file = path.join(process.cwd(), "data", "database.json");
let writeQueue = Promise.resolve();
export async function readDatabase(): Promise<Database> { return JSON.parse(await fs.readFile(file, "utf8")) as Database; }
export async function updateDatabase(mutator: (database: Database) => void | Promise<void>) {
  let result!: Database;
  writeQueue = writeQueue.then(async () => { const database = await readDatabase(); await mutator(database); const temporary = `${file}.${process.pid}.tmp`; await fs.writeFile(temporary, JSON.stringify(database, null, 2), "utf8"); await fs.copyFile(temporary, file); await fs.unlink(temporary); result = database; });
  await writeQueue; return result;
}
export async function getProducts(): Promise<Product[]> { return (await readDatabase()).products; }
export async function getSettings(): Promise<SiteSettings> { return (await readDatabase()).settings; }
export async function getOrders(): Promise<Order[]> { return (await readDatabase()).orders; }
