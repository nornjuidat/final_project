CREATE TABLE IF NOT EXISTS `veterinarians` (
  `vet_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `license_number` VARCHAR(50) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`vet_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `vet_id` INT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_fk0` FOREIGN KEY (`vet_id`) REFERENCES `veterinarians`(`vet_id`)
);

CREATE TABLE IF NOT EXISTS `animals` (
  `animal_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `species` VARCHAR(50) NOT NULL,
  `age` INT NOT NULL,
  `photo_url` VARCHAR(255) NOT NULL,
  `owner_id` INT NOT NULL,
  `vet_id` INT NOT NULL,
  PRIMARY KEY (`animal_id`),
  CONSTRAINT `animals_fk5` FOREIGN KEY (`owner_id`) REFERENCES `users`(`user_id`),
  CONSTRAINT `animals_fk6` FOREIGN KEY (`vet_id`) REFERENCES `veterinarians`(`vet_id`)
);

CREATE TABLE IF NOT EXISTS `visits` (
  `visit_id` INT NOT NULL AUTO_INCREMENT,
  `animal_id` INT NOT NULL,
  `vet_id` INT NOT NULL,
  `visit_date` DATE NOT NULL,
  `diagnosis` VARCHAR(255) NOT NULL,
  `treatment` VARCHAR(255) NOT NULL,
  `vet_notes` TEXT NOT NULL,
  PRIMARY KEY (`visit_id`),
  CONSTRAINT `visits_fk1` FOREIGN KEY (`animal_id`) REFERENCES `animals`(`animal_id`),
  CONSTRAINT `visits_fk2` FOREIGN KEY (`vet_id`) REFERENCES `veterinarians`(`vet_id`)
);

CREATE TABLE IF NOT EXISTS `vaccines` (
  `vaccine_id` INT NOT NULL AUTO_INCREMENT,
  `animal_id` INT NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `date_given` DATE NOT NULL,
  `next_due` DATE NOT NULL,
  `vet_id` INT NOT NULL,
  PRIMARY KEY (`vaccine_id`),
  CONSTRAINT `vaccines_fk1` FOREIGN KEY (`animal_id`) REFERENCES `animals`(`animal_id`),
  CONSTRAINT `vaccines_fk5` FOREIGN KEY (`vet_id`) REFERENCES `veterinarians`(`vet_id`)
);

CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `date_target` DATE NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`notification_id`),
  CONSTRAINT `notifications_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);