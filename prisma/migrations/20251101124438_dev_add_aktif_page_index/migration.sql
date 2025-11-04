/*
  Warnings:

  - You are about to drop the column `aktif` on the `about` table. All the data in the column will be lost.
  - You are about to drop the column `aktif` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pageIndex` table. All the data in the column will be lost.
  - You are about to drop the column `aktif` on the `pengalaman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "about" DROP COLUMN "aktif";

-- AlterTable
ALTER TABLE "hero" DROP COLUMN "aktif";

-- AlterTable
ALTER TABLE "pageIndex" DROP COLUMN "status",
ADD COLUMN     "aktif" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pengalaman" DROP COLUMN "aktif";
