CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  content MEDIUMTEXT NULL DEFAULT NULL,
  created_at DATETIME NULL DEFAULT NULL,
  user_id INTEGER NULL DEFAULT NULL,
  room_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  username VARCHAR(20) NULL DEFAULT NULL,
  password VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'rooms'
--
-- ---

DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  roomname VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room_id) REFERENCES rooms (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE messages ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE rooms ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO messages (id,content,created_at,user_id,room_id) VALUES
-- ('','','','','');
-- INSERT INTO users (id,username,password) VALUES
-- ('','','');
-- INSERT INTO rooms (id,roomname) VALUES
-- ('','');
