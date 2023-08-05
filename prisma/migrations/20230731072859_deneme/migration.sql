/*
  Warnings:

  - The values [SICAKLIK] on the enum `device_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `device` MODIFY `type` ENUM('LED', 'DHT11', 'RGB') NOT NULL;
