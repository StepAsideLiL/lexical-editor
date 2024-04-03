/*
  Warnings:

  - You are about to drop the column `text` on the `Text` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Text" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Text" ("content", "id") SELECT "content", "id" FROM "Text";
DROP TABLE "Text";
ALTER TABLE "new_Text" RENAME TO "Text";
CREATE UNIQUE INDEX "Text_id_key" ON "Text"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
