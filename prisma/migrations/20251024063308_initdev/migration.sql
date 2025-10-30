-- CreateEnum
CREATE TYPE "sosmed" AS ENUM ('facebook', 'linkedin', 'instagram', 'thread', 'github', 'fiverr', 'fastwork');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,

    CONSTRAINT "hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about" (
    "id" SERIAL NOT NULL,
    "tentang" TEXT NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendidikan" (
    "id" SERIAL NOT NULL,
    "sekolah" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "ipk" INTEGER NOT NULL,
    "aboutId" INTEGER NOT NULL,

    CONSTRAINT "pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengalaman" (
    "id" SERIAL NOT NULL,
    "jabatan" TEXT NOT NULL,
    "perushaan" TEXT NOT NULL,
    "tahun_mulai" TEXT NOT NULL,
    "tahun_selesai" TEXT NOT NULL,

    CONSTRAINT "pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobdesk" (
    "id" SERIAL NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "pengalamanId" INTEGER NOT NULL,

    CONSTRAINT "jobdesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "namaSkill" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyek" (
    "id" SERIAL NOT NULL,
    "gambar" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "urlProf" TEXT,

    CONSTRAINT "proyek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sosialMedia" (
    "id" SERIAL NOT NULL,
    "sosmed" "sosmed" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "sosialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pendidikan" ADD CONSTRAINT "pendidikan_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "about"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobdesk" ADD CONSTRAINT "jobdesk_pengalamanId_fkey" FOREIGN KEY ("pengalamanId") REFERENCES "pengalaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
