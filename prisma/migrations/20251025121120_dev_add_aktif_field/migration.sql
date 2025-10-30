-- AlterTable
ALTER TABLE "about" ADD COLUMN     "aktif" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "hero" ADD COLUMN     "aktif" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pengalaman" ADD COLUMN     "aktif" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "proyek" ADD COLUMN     "status" TEXT;
