/*
  Warnings:

  - You are about to drop the column `permissionsId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `FK_users_permissions`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `permissionsId`,
    ADD COLUMN `roleId` INTEGER NULL;

-- DropTable
DROP TABLE `permissions`;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '0',
    `mask` INTEGER NOT NULL DEFAULT 0,
    `version` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `permissionId` ON `users`(`roleId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_roles` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
