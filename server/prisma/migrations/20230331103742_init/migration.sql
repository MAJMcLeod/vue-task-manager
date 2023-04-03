-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(50) NOT NULL DEFAULT '0',
    `endDate` VARCHAR(50) NOT NULL DEFAULT '0',
    `status` INTEGER NOT NULL DEFAULT 0,
    `userid` INTEGER NULL,

    INDEX `userID`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '0',
    `surname` VARCHAR(50) NOT NULL DEFAULT '0',
    `email` VARCHAR(50) NOT NULL DEFAULT '0',
    `password` VARCHAR(50) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `FK_tasks_users` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
