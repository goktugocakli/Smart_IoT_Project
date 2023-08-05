/*
  Warnings:

  - Added the required column `broker_topic` to the `device` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `device` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `device` ADD COLUMN `broker_topic` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(255) NOT NULL;
