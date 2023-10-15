CREATE TABLE `body_temperatures` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`temperature_degree_celsius` real NOT NULL,
	`measured_at` text NOT NULL,
	`_created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`profile_image_url` text,
	`_created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `measured_at_index` ON `body_temperatures` (`user_id`,`measured_at`);