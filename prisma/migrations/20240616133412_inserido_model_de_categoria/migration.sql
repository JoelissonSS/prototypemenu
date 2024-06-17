/*
  Warnings:

  - You are about to drop the column `category` on the `item` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "category" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    CONSTRAINT "item_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "category" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_item" ("description", "id", "name") SELECT "description", "id", "name" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
