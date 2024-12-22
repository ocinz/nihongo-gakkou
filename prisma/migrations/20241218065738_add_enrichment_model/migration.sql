-- CreateTable
CREATE TABLE "Enrichment" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Enrichment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Enrichment" ADD CONSTRAINT "Enrichment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
