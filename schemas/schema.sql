PRAGMA foreign_keys = true;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    profile_image_url TEXT,
    _created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    _updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TRIGGER trigger_users_updated_at AFTER UPDATE ON `users`
BEGIN
    UPDATE `users`
        SET _updated_at = CURRENT_TIMESTAMP WHERE rowid == NEW.rowid;
END;

DROP TABLE IF EXISTS `roles`;

CREATE TABLE IF NOT EXISTS `roles` (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `roles` VALUES 
    (0, 'NONE'),
    (1, 'VIEWER'),
    (2, 'EDITOR');

DROP TABLE IF EXISTS `groups`;

CREATE TABLE IF NOT EXISTS `groups` (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    _created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    _updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TRIGGER trigger_groups_updated_at AFTER UPDATE ON `groups`
BEGIN
    UPDATE `groups`
        SET _updated_at = CURRENT_TIMESTAMP WHERE rowid == NEW.rowid;
END;

DROP TABLE IF EXISTS `user_groups`;

CREATE TABLE IF NOT EXISTS `user_groups` (
    user_id TEXT NOT NULL,
    group_id TEXT NOT NULL,
    _created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    _updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TRIGGER trigger_user_groups_updated_at AFTER UPDATE ON `user_groups`
BEGIN
    UPDATE `user_groups`
        SET _updated_at = CURRENT_TIMESTAMP WHERE rowid == NEW.rowid;
END;

DROP TABLE IF EXISTS `body_temperatures`;

CREATE TABLE IF NOT EXISTS `body_temperatures` (
    id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    temperature_degree_celsius REAL NOT NULL,
    measured_at DATETIME NOT NULL,
    _created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    _updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    CHECK(temperature_degree_celsius >= 0.0 AND temperature_degree_celsius <= 100.0)
);

CREATE TRIGGER trigger_body_temperatures_updated_at AFTER UPDATE ON `body_temperatures`
BEGIN
    UPDATE `body_temperatures`
        SET _updated_at = CURRENT_TIMESTAMP WHERE rowid == NEW.rowid;
END;

DROP TABLE IF EXISTS `health_data_visibilities`;

CREATE TABLE IF NOT EXISTS `health_data_visibilities` (
    id TEXT NOT NULL,
    source_user_id TEXT NOT NULL,
    target_user_id TEXT NOT NULL,
    group_id TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    _created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    _updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, source_user_id, target_user_id, group_id),
    FOREIGN KEY (source_user_id) REFERENCES users(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TRIGGER trigger_health_data_visibilities_updated_at AFTER UPDATE ON `health_data_visibilities`
BEGIN
    UPDATE `health_data_visibilities`
        SET _updated_at = CURRENT_TIMESTAMP WHERE rowid == NEW.rowid;
END;
