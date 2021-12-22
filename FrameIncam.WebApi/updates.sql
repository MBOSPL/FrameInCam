/* ALTER TABLE `trn_vendor_customer_review_replays` ADD `vendor_id` INT UNSIGNED NULL AFTER `review_id`;
INSERT INTO `config_role` (`Id`, `Name`, `Type`, `Isactive`, `NormalizedName`,
						`ConcurrencyStamp`, `created_by`, `created_date`,
						`updated_by`, `updated_date`) 
						VALUES (NULL, 'SecondShooter', '', '1',
						NULL, NULL, NULL, '2021-04-12 13:10:50', NULL, NULL);
UPDATE `config_user_roles` SET `role_id` = '3' WHERE `config_user_roles`.`id` = 33;

INSERT INTO `master_freelancer` (`id`, `name`, `type_id`, `email`, `mobile`, `description`, `payment_terms`, `additional_cost`, `experience_lov_id`, `site_url`, `fb_url`, `instagram_url`, `youtube_url`, `created_by`, `created_date`, `updated_by`, `updated_date`, `isactive`, `identifier`) VALUES (NULL, 'Prem Studios', '1', 'sivasuriyaprakash@protonmail.com', '8190918294', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, '2021-04-05 13:28:40', NULL, NULL, '0', '54041efd-c31c-469a-b528-65c1565f5c30');
*/
INSERT INTO master_freelancer_type
(id, `type`, isactive)
VALUES(1, 'Photographers', 1);
INSERT INTO master_freelancer_type
(id, `type`, isactive)
VALUES(2, 'Cinema/Video', 1);
INSERT INTO master_freelancer_type
(id, `type`, isactive)
VALUES(3, 'Pre wedding shoot', 1);

CREATE TABLE `trn_vendor_freelancer_selection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `freelancer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- frameincam.trn_vendor_customer_reviews definition

CREATE TABLE `trn_freelancer_vendor_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(10) unsigned NOT NULL,
  `created_by` varchar(191) NOT NULL,
  `title` varchar(191) CHARACTER SET latin1 NOT NULL,
  `body` text CHARACTER SET latin1 NOT NULL,
  `ratings` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `is_show` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `master_subscription_for_freelancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `duration_months` int(10) unsigned NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `project_count` int(11) NOT NULL,
  `price_per_project` decimal(18,2) DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO master_subscription_for_freelancer (name,description,duration_months,price,project_count,price_per_project,duration_days) VALUES
	 ('1 Year Subscription','1,299 Rs + 18% GST',12,1533.00,25,600.00,365);

CREATE TABLE `master_freelancer_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(11) NOT NULL,
  `subscription_id` int(11) NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_till` datetime DEFAULT NULL,
  `payment_id` int(10) unsigned DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `total_projects` int(10) unsigned DEFAULT NULL,
  `remaining_projects` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

ALTER TABLE master_subscription ADD is_active TINYINT NULL;
update master_subscription set is_active=true;
INSERT INTO master_subscription (name,description,duration_months,price,project_count,price_per_project,duration_days,is_active) VALUES
	 ('Trail','Trail For 7 Days',0,13877.00,25,600.00,7,0);