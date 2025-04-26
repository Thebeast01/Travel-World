/*
  Warnings:

  - You are about to drop the column `avilableDates` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "avilableDates",
ADD COLUMN     "availableDates" TEXT[];
