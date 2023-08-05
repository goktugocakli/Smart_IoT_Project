/*
  Warnings:

  - You are about to drop the `user_device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_device` DROP FOREIGN KEY `user_device_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `user_device` DROP FOREIGN KEY `user_device_userId_fkey`;

-- DropTable
DROP TABLE `user_device`;

-- CreateTable
CREATE TABLE `_deviceTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_deviceTouser_AB_unique`(`A`, `B`),
    INDEX `_deviceTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_deviceTouser` ADD CONSTRAINT `_deviceTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_deviceTouser` ADD CONSTRAINT `_deviceTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
