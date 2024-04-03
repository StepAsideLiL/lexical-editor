-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Text" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Text" ("id", "text") SELECT "id", "text" FROM "Text";
DROP TABLE "Text";
ALTER TABLE "new_Text" RENAME TO "Text";
CREATE UNIQUE INDEX "Text_id_key" ON "Text"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
