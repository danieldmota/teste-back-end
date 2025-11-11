-- CreateTable
CREATE TABLE "adm" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "adm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adm_senha_key" ON "adm"("senha");
