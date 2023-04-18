/*
  Warnings:

  - You are about to drop the column `token_string` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `refresh_token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `FK__users`;

-- AlterTable
ALTER TABLE `refresh_token` DROP COLUMN `token_string`,
    DROP COLUMN `user_id`,
    ADD COLUMN `tokenString` VARCHAR(50) NOT NULL DEFAULT '0',
    ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `user_id` ON `refresh_token`(`userId`);

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `FK__users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
