-- AlterTable
ALTER TABLE "pengalaman" ADD COLUMN     "pageIndexId" INTEGER;

-- AlterTable
ALTER TABLE "proyek" ADD COLUMN     "pageindexId" INTEGER;

-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "pageIndexId" INTEGER;

-- CreateTable
CREATE TABLE "pageIndex" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "aboutId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pageIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pageIndex_heroId_key" ON "pageIndex"("heroId");

-- CreateIndex
CREATE UNIQUE INDEX "pageIndex_aboutId_key" ON "pageIndex"("aboutId");

-- AddForeignKey
ALTER TABLE "pengalaman" ADD CONSTRAINT "pengalaman_pageIndexId_fkey" FOREIGN KEY ("pageIndexId") REFERENCES "pageIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_pageIndexId_fkey" FOREIGN KEY ("pageIndexId") REFERENCES "pageIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyek" ADD CONSTRAINT "proyek_pageindexId_fkey" FOREIGN KEY ("pageindexId") REFERENCES "pageIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageIndex" ADD CONSTRAINT "pageIndex_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageIndex" ADD CONSTRAINT "pageIndex_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "about"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
