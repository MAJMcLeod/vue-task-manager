/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `refresh_token` MODIFY `tokenString` VARCHAR(256) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `permissionsId` INTEGER NULL;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '0',
    `mask` INTEGER NOT NULL DEFAULT 0,
    `version` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `userId` ON `refresh_token`(`userId`);

-- CreateIndex
CREATE INDEX `permissionsId` ON `users`(`permissionsId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_permissions` FOREIGN KEY (`permissionsId`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
