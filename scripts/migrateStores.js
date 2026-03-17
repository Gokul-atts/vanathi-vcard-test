import * as XLSX from "xlsx";
import fs from "fs";
import { stores } from "../const/DummyStores.js";

const EXCEL_FILE = "./data/V-Card.xlsx";

async function migrateStores() {
  const fileBuffer = fs.readFileSync(EXCEL_FILE);

  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet);

  const excelStores = rows.map((row) => ({
    name: row["Name"] || "",
    address: row["Address"] || "",
    phone: row["Contact No"] || "",
    map: row["Location"] || "",
    discount: row["Discount"] || "",
    category: row["Category"] || "",
    areas: row["Areas"] || "",
    badge: row.badge || "",
  }));

  const newstores = [...stores, ...excelStores];

  const content = "export const stores = " + JSON.stringify(newstores, null, 2);

  fs.writeFileSync("./const/DummyStores.js", content);

  console.log("✅ Stores merged and migrated successfully");
}

migrateStores();
