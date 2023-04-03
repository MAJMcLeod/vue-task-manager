/*
  Warnings:

  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `FK_tasks_users`;

-- DropTable
DROP TABLE `tasks`;

-- DropTable
DROP TABLE `users`;
