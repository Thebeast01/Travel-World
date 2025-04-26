/*
  Warnings:

  - You are about to drop the column `travelPackageId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `TravelPackage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Package_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_travelPackageId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "travelPackageId",
ADD COLUMN     "Package_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "TravelPackage";

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "avilableDates" TIMESTAMP(3)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_Package_id_fkey" FOREIGN KEY ("Package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
