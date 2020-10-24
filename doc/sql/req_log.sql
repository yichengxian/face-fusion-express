/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯云mysql-dev
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : gz-cdb-c12i98lr.sql.tencentcdb.com:59666
 Source Schema         : face_effects_dev

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 23/10/2020 14:49:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for req_log
-- ----------------------------
DROP TABLE IF EXISTS `req_log`;
CREATE TABLE `req_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `time` datetime DEFAULT NULL COMMENT '请求时间',
  `method` varchar(8) DEFAULT NULL COMMENT '请求方式',
  `client_ip` varchar(32) DEFAULT NULL COMMENT '客户端ip',
  `resp_time` double(20,4) DEFAULT NULL COMMENT '响应时间',
  `url` varchar(1024) DEFAULT NULL COMMENT '请求url',
  `status` int(4) DEFAULT NULL COMMENT '请求状态',
  `user-agent` varchar(1024) DEFAULT NULL COMMENT '浏览器信息',
  `token` varchar(255) DEFAULT NULL COMMENT 'token值',
  `params` mediumtext COMMENT '请求参数',
  `resp` mediumtext COMMENT '响应参数',
  `content_length` bigint(20) DEFAULT NULL COMMENT '请求长度',
  PRIMARY KEY (`id`),
  KEY `time` (`time`) USING BTREE COMMENT '时间索引'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='请求日志表';

SET FOREIGN_KEY_CHECKS = 1;
