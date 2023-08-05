/*
  Warnings:

  - Added the required column `type` to the `device` table without a default value. This is not possible if the table is not empty.
  - Made the column `surname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `device` ADD COLUMN `type` ENUM('LED', 'SICAKLIK') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `surname` VARCHAR(255) NOT NULL;
