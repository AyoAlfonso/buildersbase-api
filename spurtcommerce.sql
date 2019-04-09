-- Spurtcommerce SQL Dump
-- version 2.0.0
-- http://www.spurtcommerce.com

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spurtcommerce`
--
use spurtcommerce;
-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) DEFAULT NULL,
  `company` varchar(32) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `address_1` varchar(128) DEFAULT NULL,
  `address_2` varchar(128) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address_type` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sort_order` varchar(255) DEFAULT NULL,
  `url` tinytext,
  `banner_group_id` int(11) DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `view_page_count` int(11) DEFAULT '0',
  `banner_group_banner_group_id` int(11) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `content` text,
  `position` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `title`, `sort_order`, `url`, `banner_group_id`, `container_name`, `view_page_count`, `banner_group_banner_group_id`, `link`, `image`, `image_path`, `content`, `position`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(36, 'banner', NULL, NULL, NULL, NULL, 0, 0, 'banner', '1banner4.jpg', 'banner/', 'banner', 0, NULL, '2019-02-12 03:00:33', NULL, NULL, NULL),
(39, 'Banner', NULL, NULL, NULL, NULL, 0, 0, 'Banner', 'banner1.jpeg', 'banner/', 'Banner', 1, NULL, '2019-02-12 08:46:47', '2019-02-12 23:10:39', NULL, NULL),
(40, 'cover', NULL, NULL, NULL, NULL, 0, 0, 'link', 'banner2.jpeg', 'banner/', 'cover image', 1, NULL, '2019-02-13 21:17:31', NULL, NULL, NULL),
(41, 'watch', NULL, NULL, NULL, NULL, 0, 0, 'link', 'banner3.jpeg', 'banner/', 'watch image', 1, NULL, '2019-02-13 21:18:53', NULL, NULL, NULL),
(42, 'laptop', NULL, NULL, NULL, NULL, 0, 0, 'www.samsung.com', 'Img_1550114251498.jpeg', 'banner/', 'dress', 1, NULL, '2019-02-13 21:20:21', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banner_group`
--

CREATE TABLE `banner_group` (
  `banner_group_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image`
--

CREATE TABLE `banner_image` (
  `banner_image_id` int(11) NOT NULL,
  `banner_id` varchar(32) NOT NULL,
  `link` varchar(255) NOT NULL,
  `image` varchar(45) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner_image_description`
--

CREATE TABLE `banner_image_description` (
  `banner_image_description_id` int(11) NOT NULL,
  `banner_image_id` int(11) DEFAULT NULL,
  `banner_id` int(11) DEFAULT NULL,
  `title` varchar(4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `parent_int` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `image`, `image_path`, `parent_int`, `sort_order`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keyword`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(4, 'Mobile', '', NULL, 0, 1, 'mobiles', 'mobiles', 'mobiles', '1', NULL, NULL, '2019-02-13 16:16:24', NULL),
(5, 'Laptop', '', NULL, 0, 1, 'Laptops', 'Laptops', 'Laptops', '1', NULL, NULL, '2019-02-13 16:16:40', NULL),
(6, 'mens watch', '', NULL, 0, 1, 'mens watch', 'mens watch', 'mens watch', '1', NULL, NULL, '2019-02-13 16:17:00', '2019-02-13 17:52:16'),
(7, 'Television', '', NULL, 0, 1, 'Television', 'Television', 'Television', '1', NULL, NULL, '2019-02-13 16:17:12', NULL),
(8, 'Dress', '', NULL, 0, 1, 'Dress', 'Dress', 'Dress', '1', NULL, NULL, '2019-02-13 16:17:41', NULL),
(9, 'womens watch', '', NULL, 0, 1, 'womens watch', 'womens watch', 'womens watch', '1', NULL, NULL, '2019-02-13 17:52:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category_description`
--

CREATE TABLE `category_description` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `meta_description` varchar(65) DEFAULT NULL,
  `meta_keyword` varchar(255) DEFAULT NULL,
  `category_description_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `message` text,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `iso_code_2` varchar(2) DEFAULT NULL,
  `iso_code_3` varchar(3) DEFAULT NULL,
  `address_format` text,
  `postcode_required` tinyint(1) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `name`, `iso_code_2`, `iso_code_3`, `address_format`, `postcode_required`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(2, 'Indonesia', 'ID', 'ddd', NULL, 1, NULL, '2019-02-07 07:00:37', '2019-02-11 06:32:16', NULL, NULL),
(4, 'Andorra', 'AD', 'ADO', NULL, 0, NULL, '2019-02-07 07:01:20', NULL, NULL, NULL),
(5, 'Angola', 'AO', 'ddd', NULL, 0, NULL, '2019-02-07 07:02:02', '2019-02-11 05:43:20', NULL, NULL),
(7, 'Chile', 'CL', 'CLE', NULL, 0, NULL, '2019-02-07 07:02:45', '2019-02-07 07:03:24', NULL, NULL),
(12, 'Comoros', 'CM', 'CMS', NULL, 0, NULL, '2019-02-12 03:05:13', NULL, NULL, NULL),
(13, 'Greece', 'GR', 'GRE', NULL, 0, NULL, '2019-02-12 03:32:59', NULL, NULL, NULL),
(15, 'India', 'IN', 'IND', NULL, 1, NULL, '2019-02-13 22:54:41', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `symbol_left` varchar(32) DEFAULT NULL,
  `symbol_right` varchar(32) DEFAULT NULL,
  `decimal_place` decimal(5,0) DEFAULT NULL,
  `value` float(15,8) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(512) DEFAULT NULL,
  `last_name` varchar(512) DEFAULT NULL,
  `username` varchar(512) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` tinytext,
  `mail_status` int(11) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT '0',
  `customer_group_id` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `newsletter` int(11) DEFAULT NULL,
  `safe` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `mobile`, `address`, `country_id`, `city`, `pincode`, `avatar`, `avatar_path`, `mail_status`, `delete_flag`, `customer_group_id`, `last_login`, `newsletter`, `safe`, `ip`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 'spurtcommerce', NULL, 'demo@spurtcommerce.com', 'demo@spurtcommerce.com', '$2a$10$EYWhnLlEbXNMJzSkbifgpeUONBMVi7GcWS57kgCmaSRwjGpubHHgu', '1234567890', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2019-02-21 16:54:53', NULL, NULL, '::1', NULL, NULL, NULL, '2019-02-21 16:53:17', '2019-02-21 16:54:53');

-- --------------------------------------------------------

--
-- Table structure for table `customer_group`
--

CREATE TABLE `customer_group` (
  `id` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_ip`
--

CREATE TABLE `customer_ip` (
  `customer_ip_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_transaction`
--

CREATE TABLE `customer_transaction` (
  `customer_transaction_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `description` text,
  `amount` decimal(15,4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_wishlist`
--

CREATE TABLE `customer_wishlist` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `id` int(11) NOT NULL,
  `shortname` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `geo_zone`
--

CREATE TABLE `geo_zone` (
  `geo_zone_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `code` varchar(5) DEFAULT NULL,
  `image` text,
  `image_path` text,
  `locale` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `login_log`
--

CREATE TABLE `login_log` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `sort_order` int(3) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturer_id`, `name`, `image`, `image_path`, `sort_order`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 'Levi\'s', 'Img_1550109165305.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-13 19:52:45', NULL),
(2, 'addidas', 'Img_1550111587155.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-13 20:33:07', NULL),
(3, 'woodLand', 'Img_1550111688984.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-13 20:34:48', NULL),
(4, 'dressberry', 'Img_1550112255929.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-13 20:44:15', NULL),
(5, 'fast track', 'Img_1550124943299.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-14 00:15:43', NULL),
(6, 'apple', 'Img_1550124983914.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-14 00:16:23', NULL),
(7, 'sonata', 'Img_1550125040563.png', 'manufacturer/', 1, 1, NULL, NULL, '2019-02-14 00:17:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1546513939916, 'CreateUserTable1546513939916'),
(2, 1546516990326, 'CreateUserGroupTable1546516990326'),
(3, 1546521833384, 'CreateUserRelationToUserGroupTable1546521833384'),
(4, 1546522725201, 'CreateCategoryTable1546522725201'),
(5, 1546523068121, 'CreateZoneToGeoZoneTable1546523068121'),
(6, 1546523201059, 'CreateCustomerGroupTable1546523201059'),
(7, 1546523577052, 'CreateCustomerIpTable1546523577052'),
(8, 1546523725119, 'CreateGeoZoneTable1546523725119'),
(9, 1546523802480, 'CreateBannerGroupTable1546523802480'),
(10, 1546524333028, 'CreateCurrencyTable1546524333028'),
(11, 1546524561001, 'CreateCustomerTable1546524561001'),
(12, 1546525248338, 'CreateAddessTable1546525248338'),
(13, 1546525786783, 'CreateBannerImageTable1546525786783'),
(14, 1546525833396, 'CreateStockStatusTable1546525833396'),
(15, 1546526076621, 'CreateBannerTable1546526076621'),
(16, 1546526936010, 'CreateBannerImageDescriptionTable1546526936010'),
(17, 1546527306595, 'CreateCustomerTransactionTable1546527306595'),
(18, 1546528787878, 'CreateProductTable1546528787878'),
(19, 1546529746397, 'CreateProductRelatedTable1546529746397'),
(20, 1546529906290, 'CreateManufacturerTable1546529906290'),
(21, 1546530096773, 'CreateProductTagTable1546530096773'),
(22, 1546578299514, 'CreateLanguageTable1546578299514'),
(23, 1546578412979, 'AddProductRelatedRelationToProductTable1546578412979'),
(24, 1546578790576, 'CreateCategoryDescriptionTable1546578790576'),
(25, 1546579410193, 'CreateProductImageTable1546579410193'),
(26, 1546579597970, 'CreateEmailTemplateTable1546579597970'),
(27, 1546579614441, 'CreateProductDescriptionTable1546579614441'),
(28, 1546579884423, 'CreateProductToCategoryTable1546579884423'),
(29, 1546580085881, 'CreateCountryTable1546580085881'),
(30, 1546580179314, 'CreateProductDiscountTable1546580179314'),
(31, 1546580427531, 'CreateProductRatingTable1546580427531'),
(32, 1546580612161, 'CreateZoneTable1546580612161'),
(33, 1546580872313, 'CreateOrderProductTable1546580872313'),
(34, 1546580970382, 'CreateSettingsTable1546580970382'),
(35, 1546581203387, 'CreateOrderOptionTable1546581203387'),
(36, 1546581429998, 'CreateOrderTotalTable1546581429998'),
(37, 1546581683040, 'CreatePageGroupTable1546581683040'),
(38, 1546581933917, 'CreateOrderHistoryTable1546581933917'),
(39, 1546582132870, 'CreateOrderStatusTable1546582132870'),
(40, 1546582513520, 'CreatePageTable1546582513520'),
(41, 1546585163896, 'AddProductImageRelationToProductTable1546585163896'),
(42, 1546585326281, 'AddProductDiscountRelationToProductTable1546585326281'),
(43, 1546585460413, 'AddProductRatingRelationToProductTable1546585460413'),
(44, 1546585572765, 'AddPageRelationToPageGroupTable1546585572765'),
(45, 1546586351105, 'CreateZoneCountryRelationToZoneGeoTable1546586351105'),
(46, 1546587376381, 'CreateOrderTable1546587376381'),
(47, 1546588310183, 'CreateCountryRelationToZoneGeoTable1546588310183'),
(48, 1546588504951, 'CreateZoneRelationToCountryTable1546588504951'),
(49, 1546590314988, 'CreateCountryRelationToSettingsTable1546590314988'),
(50, 1546590433005, 'AddPoductToCategoryRelationToProductTable1546590433005'),
(51, 1546590872444, 'AddPoductToCategoryRelationToCategoryTable1546590872444'),
(52, 1546592870823, 'AddCustomerTransactionRelationToOrderTable1546592870823'),
(53, 1546593012207, 'AddCustomerTransactionRelationToCustomerTable1546593012207'),
(54, 1546593289549, 'AddOrderProductRelationToProductTable1546593289549'),
(55, 1546593359310, 'AddOrderProductRelationToOrderTable1546593359310'),
(56, 1546593427323, 'CreateCategoryRelationToCategoryDescriptionTable1546593427323'),
(57, 1546593494331, 'AddOrderOptionRelationToOrderTable1546593494331'),
(58, 1546593946185, 'AddOrderOptionRelationToOrderProductTable1546593946185'),
(59, 1546594100673, 'CreatebannerRelationToBannerImageDescriptionTable1546594100673'),
(60, 1546594184432, 'AddOrderHistoryRelationToOrderTable1546594184432'),
(61, 1546594262644, 'AddOrderHistoryRelationToOrderStatusTable1546594262644'),
(62, 1546594411489, 'CreateBannerImageRelationToBannerImageDescriptionTable1546594411489'),
(63, 1546594752832, 'AddOrderRelationToCustomerTable1546594752832'),
(64, 1546594852304, 'AddOrderRelationToCurrencyTable1546594852304'),
(65, 1546602183498, 'CreateBannerGroupRelationToBannerTable1546602183498');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `shipping_zone_id` int(11) DEFAULT NULL,
  `payment_zone_id` int(11) DEFAULT NULL,
  `shipping_country_id` int(11) DEFAULT NULL,
  `payment_country_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
  `firstname` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) DEFAULT NULL,
  `email` varchar(96) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `shipping_firstname` varchar(32) DEFAULT NULL,
  `shipping_lastname` varchar(32) DEFAULT NULL,
  `shipping_company` varchar(32) DEFAULT NULL,
  `shipping_address_1` varchar(128) DEFAULT NULL,
  `shipping_address_2` varchar(128) DEFAULT NULL,
  `shipping_city` varchar(128) DEFAULT NULL,
  `shipping_postcode` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(128) DEFAULT NULL,
  `shipping_zone` varchar(128) DEFAULT NULL,
  `shipping_address_format` text,
  `shipping_method` varchar(128) DEFAULT NULL,
  `payment_firstname` varchar(32) DEFAULT NULL,
  `payment_lastname` varchar(32) DEFAULT NULL,
  `payment_company` varchar(32) DEFAULT NULL,
  `payment_address_1` varchar(128) DEFAULT NULL,
  `payment_address_2` varchar(128) DEFAULT NULL,
  `payment_city` varchar(128) DEFAULT NULL,
  `payment_postcode` varchar(10) DEFAULT NULL,
  `payment_country` varchar(128) DEFAULT NULL,
  `payment_zone` varchar(128) DEFAULT NULL,
  `payment_address_format` text,
  `payment_method` varchar(128) DEFAULT NULL,
  `comment` text,
  `total` decimal(10,0) DEFAULT NULL,
  `reward` int(8) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(3) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id`, `customer_id`, `currency_id`, `shipping_zone_id`, `payment_zone_id`, `shipping_country_id`, `payment_country_id`, `invoice_no`, `invoice_prefix`, `firstname`, `lastname`, `email`, `telephone`, `fax`, `shipping_firstname`, `shipping_lastname`, `shipping_company`, `shipping_address_1`, `shipping_address_2`, `shipping_city`, `shipping_postcode`, `shipping_country`, `shipping_zone`, `shipping_address_format`, `shipping_method`, `payment_firstname`, `payment_lastname`, `payment_company`, `payment_address_1`, `payment_address_2`, `payment_city`, `payment_postcode`, `payment_country`, `payment_zone`, `payment_address_format`, `payment_method`, `comment`, `total`, `reward`, `order_status_id`, `affiliate_id`, `commision`, `currency_code`, `currency_value`, `ip`, `payment_flag`, `order_name`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 1, NULL, NULL, NULL, NULL, NULL, '60', 'spu', NULL, NULL, 'demo@spurtcommerce.com', '1234567890', NULL, 'spurtcommerce', 's', 'ggg', 'ff', 'fff', 'ffff', '36763', 'cjx', 'dfgj', 'dfgj', NULL, 'spurtcommerce', 's', 'ggg', 'ff', 'fff', 'ffff', '36763', 'cjx', 'dfgj', 'dfgj', NULL, NULL, '74999', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-02-21 17:02:16', '2019-02-21 17:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `order_history_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `notify` tinytext,
  `comment` text,
  `date_added` datetime DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `order_log_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `shipping_zone_id` int(11) DEFAULT NULL,
  `payment_zone_id` int(11) DEFAULT NULL,
  `shipping_country_id` int(11) DEFAULT NULL,
  `payment_country_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
  `firstname` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) DEFAULT NULL,
  `email` varchar(96) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `shipping_firstname` varchar(32) DEFAULT NULL,
  `shipping_lastname` varchar(32) DEFAULT NULL,
  `shipping_company` varchar(32) DEFAULT NULL,
  `shipping_address_1` varchar(128) DEFAULT NULL,
  `shipping_address_2` varchar(128) DEFAULT NULL,
  `shipping_city` varchar(128) DEFAULT NULL,
  `shipping_postcode` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(128) DEFAULT NULL,
  `shipping_zone` varchar(128) DEFAULT NULL,
  `shipping_address_format` text,
  `shipping_method` varchar(128) DEFAULT NULL,
  `payment_firstname` varchar(32) DEFAULT NULL,
  `payment_lastname` varchar(32) DEFAULT NULL,
  `payment_company` varchar(32) DEFAULT NULL,
  `payment_address_1` varchar(128) DEFAULT NULL,
  `payment_address_2` varchar(128) DEFAULT NULL,
  `payment_city` varchar(128) DEFAULT NULL,
  `payment_postcode` varchar(10) DEFAULT NULL,
  `payment_country` varchar(128) DEFAULT NULL,
  `payment_zone` varchar(128) DEFAULT NULL,
  `payment_address_format` text,
  `payment_method` varchar(128) DEFAULT NULL,
  `comment` text,
  `total` decimal(15,4) DEFAULT NULL,
  `reward` int(8) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `affiliate_id` int(11) DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int(3) DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_option`
--

CREATE TABLE `order_option` (
  `order_option_id` int(11) NOT NULL,
  `product_option_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_product_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_product_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(24) NOT NULL,
  `quantity` int(4) NOT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,4) DEFAULT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`order_product_id`, `product_id`, `order_id`, `name`, `model`, `quantity`, `trace`, `total`, `tax`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 95, 1, 'Apple iPhone X', 'apple', 1, NULL, '74999.0000', NULL, NULL, NULL, NULL, '2019-02-21 17:02:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `name`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 'Inprogress', 1, NULL, NULL, NULL, NULL),
(2, 'shipped', 1, NULL, NULL, NULL, NULL),
(3, 'delivered', 1, NULL, NULL, NULL, NULL),
(4, 'completed', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_total`
--

CREATE TABLE `order_total` (
  `order_total_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `value` decimal(15,4) NOT NULL,
  `sort_order` int(3) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_total`
--

INSERT INTO `order_total` (`order_total_id`, `order_id`, `code`, `title`, `text`, `value`, `sort_order`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 1, NULL, NULL, NULL, '74999.0000', NULL, NULL, NULL, NULL, '2019-02-21 17:02:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `page_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `intro` text,
  `full_text` text,
  `page_group_id` int(11) DEFAULT NULL,
  `sort_order` int(3) DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keywords` varchar(255) DEFAULT NULL,
  `view_page_count` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`page_id`, `title`, `intro`, `full_text`, `page_group_id`, `sort_order`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `view_page_count`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(113, 'home', NULL, 'dashboards', NULL, NULL, 'homepage', 'dashboard page', 'home', NULL, 1, NULL, NULL, '2019-02-13 21:42:46', NULL),
(115, 'product', NULL, 'Details about product', NULL, NULL, 'product', 'detail of product', 'product', NULL, 1, NULL, NULL, '2019-02-13 21:53:08', NULL),
(116, 'category', NULL, 'Details about category', NULL, NULL, 'category', 'detail of category', 'category', NULL, 1, NULL, NULL, '2019-02-13 21:53:33', NULL),
(118, 'user', NULL, 'Details about user', NULL, NULL, 'user', 'detail of user', 'user', NULL, 1, NULL, NULL, '2019-02-13 21:56:44', NULL),
(119, 'customer', NULL, 'Details about customer', NULL, NULL, 'customer', 'detail of customer', 'customer', NULL, 1, NULL, NULL, '2019-02-13 21:56:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `page_group`
--

CREATE TABLE `page_group` (
  `page_group_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `sku` varchar(64) DEFAULT NULL,
  `upc` varchar(12) DEFAULT NULL,
  `quantity` int(4) DEFAULT NULL,
  `stock_status_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` text,
  `manufacturer_id` int(11) DEFAULT NULL,
  `shipping` tinyint(4) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `date_available` date DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `amount` float DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `subtract_stock` int(11) DEFAULT NULL COMMENT '0->no 1->yes',
  `minimum_quantity` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `wishlist_status` int(11) DEFAULT NULL,
  `delete_flag` int(11) NOT NULL DEFAULT '0',
  `is_featured` int(11) DEFAULT NULL,
  `condition` int(11) DEFAULT NULL COMMENT '1->new 2->used',
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `sku`, `upc`, `quantity`, `stock_status_id`, `image`, `image_path`, `manufacturer_id`, `shipping`, `price`, `date_available`, `sort_order`, `name`, `description`, `amount`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keyword`, `discount`, `subtract_stock`, `minimum_quantity`, `location`, `wishlist_status`, `delete_flag`, `is_featured`, `condition`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(95, 'S001', 'B00005N5PF', 25, 1, NULL, NULL, 1, 1, '74999', '2019-02-13', 1, 'Apple iPhone X', 'Poly Ringtone, Mini-SIM 1.52-inch TFT screen with 128x128 pixels resolution; Network: GSM (900/1,800MHz) Samsung proprietary operating system 800mAH battery providing talktime of 7 hours and standby time of 720 hours 1 year manufacturer warranty for device and 6 month manufacturer warranty for in-box accessories including batteries from the date of purchase.', NULL, 'Apple iPhone X', NULL, NULL, NULL, 1, 5, 'Bangalore', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 17:07:06', '2019-02-18 01:46:38'),
(97, 'S003', 'E00005N5PF', 25, 1, NULL, NULL, 1, 1, '23990', '2019-02-13', 1, 'Samsung Guru 1200', 'Poly Ringtone, Mini-SIM 1.52-inch TFT screen with 128x128 pixels resolution; Network: GSM (900/1,800MHz) Samsung proprietary operating system 800mAH battery providing talktime of 7 hours and standby time of 720 hours 1 year manufacturer warranty for device and 6 month manufacturer warranty for in-box accessories including batteries from the date of purchase.', NULL, 'Samsung Guru 1200', NULL, NULL, NULL, 1, 3, 'Bangalore', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 17:14:02', '2019-02-20 23:35:00'),
(98, 'S004', 'T00005N5PF', 10, 1, NULL, NULL, 1, 1, '15350', '2019-02-13', 1, 'Moto G6 Plus', '12+5 MP dual camera: Google Lens, text scanner, portrait mode, spot colour, face filters, panorama, manual mode, up to 4K ultra HD video capture, time lapse and slow motion video 16 MP front camera: Group selfie, beautification, manual mode, face filters, up to 1080p (30 fps) time lapse and slow motion video 14.99 cm (5.9-inch) Full HD+ display with 1080 x 2160 pixels resolution 6 GB RAM, 64 GB internal memory expandable up to 256 GB | Dual SIM (nano+nano) with dual-standby (4G+4G) 2.2GHz Qualcomm Snapdragon 630 octa-core processor with Android v8.0 Oreo 3200 mAh lithium-polymer battery 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase', NULL, 'Moto G6 Plus', NULL, NULL, NULL, 1, 3, 'London', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:18:26', '2019-02-15 06:56:01'),
(99, 'S005', 'L00005N5PF', 10, 1, NULL, NULL, 1, 1, '27990', '2019-02-13', 1, 'Lenovo Ideapad 330S', 'Processor: 7th Generation Intel core i3-7020U processor, 2.3GHz base processor speed Operating System: Pre-loaded Windows 10 Home with lifetime validity Display: 14-inch HD (1366x768) display Memory & Storage: 4GB DDR4 |Storage:1TB HDD Design & battery: Thin and light design|Laptop weight: 1.59 kg|Average battery life = 4 hours, Lithium battery Warranty:This genuine HP laptop comes with 1 year domestic warranty from HP covering manufacturing defects and not covering physical damage. For more details, see Warranty section below Pre-installed Software: None|In the box: Laptop with included battery, charger Ports and CD drive: 1 USB 2.0,2 USB 3.0, 1 HDMI, 1 Audio-output |Without CD-Drive', NULL, 'Lenovo Ideapad 330S', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 17:22:22', '2019-02-14 00:51:39'),
(100, 'S007', 'AS90005N5PF', 10, 1, NULL, NULL, 1, 1, '99990', '2019-02-13', 1, 'Apple MacBook Air Core', '1.6GHz Intel Core i5-8210Y processor 8GB LPDDR3 RAM 128GB hard drive Stunning 13.3-inch Retina display, Intel UHD Graphics 617 Graphics 1.25kg laptop This model has two Thunderbolt 3 ports; These two ports support charging the notebook, DisplayPort, Thunderbolt (up to Gbps and USB 3.1 Generation 2 (up to 10 Gbps); It has 3 internal microphones; single 3.5-inch analog audio output/headphone jack This model has a 2560 by 1600 native resolution at 227 ppi and support for millions of colors; It also supports scaled resolutions of 1680 by 1050, 1440 by 900 and 1024 by 640; It has a 16:10 aspect ratio Battery and Power: 30W USB-C Power Adapter provides up to 12 hours wireless web and up to 13 hours iTunes movie playback Touch ID Fast SSD storage Stereo speakers with wider stereo sound Latest Apple-designed keyboard Force Touch trackpad 802.11ac Wi-Fi macOS Mojave, inspired by pros but designed for everyone, with Dark Mode, Stacks, easier screenshots, new built-in apps and more', NULL, 'Apple MacBook Air CoreS', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 17:28:01', '2019-02-14 04:39:58'),
(101, 'S007', 'AS90005N5PF', 10, 1, NULL, NULL, 1, 1, '208390', '2019-02-13', 1, 'Dell Alienware 15', '1.6GHz Intel Core i5-8210Y processor 8GB LPDDR3 RAM 128GB hard drive Stunning 13.3-inch Retina display, Intel UHD Graphics 617 Graphics 1.25kg laptop This model has two Thunderbolt 3 ports; These two ports support charging the notebook, DisplayPort, Thunderbolt (up to Gbps and USB 3.1 Generation 2 (up to 10 Gbps); It has 3 internal microphones; single 3.5-inch analog audio output/headphone jack This model has a 2560 by 1600 native resolution at 227 ppi and support for millions of colors; It also supports scaled resolutions of 1680 by 1050, 1440 by 900 and 1024 by 640; It has a 16:10 aspect ratio Battery and Power: 30W USB-C Power Adapter provides up to 12 hours wireless web and up to 13 hours iTunes movie playback Touch ID Fast SSD storage Stereo speakers with wider stereo sound Latest Apple-designed keyboard Force Touch trackpad 802.11ac Wi-Fi macOS Mojave, inspired by pros but designed for everyone, with Dark Mode, Stacks, easier screenshots, new built-in apps and more', NULL, 'Apple MacBook Air CoreS', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:30:38', '2019-02-14 04:39:58'),
(102, 'S008', 'OT90005N5PF', 10, 1, NULL, NULL, 1, 1, '81990', '2019-02-13', 1, 'HP Pavilion-15-cc134Tx', '1.8GHz Intel core_i7 processor 8GB DDR4 RAM 2TB Serial ATA hard drive 15.6-inch screen, NVIDIA GeForce 940MX (4 GB DDR3 dedicated) 4GB Graphics Windows 10 home operating system 0.30 kg laptop', NULL, 'HP Pavilion-15-cc134Tx', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:33:19', '2019-02-14 00:54:06'),
(103, 'S011', 'SE90005N5P7', 10, 1, NULL, NULL, 2, 1, '28990', '2019-02-13', 1, 'Samsung series 5', 'Resolution: Full HD (1920 x 1080p) | Refresh Rate: 60 hertz Display: FHD Resolution Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB port to connect hard drives and other USB devices Sound output: 14 Watts Output Installation: For installation/wall mounting/demo of this product once delivered, directly contact Samsung at 1800407267864/18002668282 and provide products model name and seller\'s details mentioned on your invoice. The service center will allot you a convenient slot for the service Warranty: 1 year standard manufacturer warranty from Samsung Additional Information : This product does not have table top stand hence will only be installed through wall mounting. Easy returns: This product is eligible for replacement/refund within 10 days of delivery in case of any product defects, damage or features not matching the description provided', NULL, 'Samsung series 5', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 17:44:00', '2019-02-13 23:24:31'),
(104, 'S012', 'SE90005N5P7', 10, 1, NULL, NULL, 2, 1, '30999', '2019-02-13', 1, 'Mi LED TV 4A PRO', 'Resolution : Full HD (1920x1080p) | Refresh Rate: 60 hertz Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console, 2 USB ports to connect hard drives and other USB devices Sound: 20 W output | DTS-HD sound Smart TV features : | PatchWall with Android TV and Set-Top Box Integration | Chromecast built-in | 700,000+ hrs of Content | Mi Remote with Google voice search | Content across 15 languages | Play Store, YouTube, Play Movies, Play Music | Hotstar, Voot, Sony LIV, Hungama, Zee5, Eros Now, Alt Balaji, Sun NXT, Hooq, TVF, Epic ON, Flickstree| Prime Video coming soon | Mi Remote controls TV, set-top box and smart home devices eg. Mi Air Purifier', NULL, 'Mi LED TV 4A PRO', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:47:05', '2019-02-13 23:24:31'),
(105, 'S012', 'SE90005N5P7', 10, 1, NULL, NULL, 2, 1, '30999', '2019-02-13', 1, 'Sony Bravia 80 cm', 'Resolution : Full HD (1920x1080p) | Refresh Rate: 60 hertz Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console, 2 USB ports to connect hard drives and other USB devices Sound: 20 W output | DTS-HD sound Smart TV features : | PatchWall with Android TV and Set-Top Box Integration | Chromecast built-in | 700,000+ hrs of Content | Mi Remote with Google voice search | Content across 15 languages | Play Store, YouTube, Play Movies, Play Music | Hotstar, Voot, Sony LIV, Hungama, Zee5, Eros Now, Alt Balaji, Sun NXT, Hooq, TVF, Epic ON, Flickstree| Prime Video coming soon | Mi Remote controls TV, set-top box and smart home devices eg. Mi Air Purifier', NULL, 'Sony Bravia 80 cm', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:48:05', '2019-02-15 06:56:01'),
(106, 'S012', 'SE90005N5P7', 10, 1, NULL, NULL, 2, 1, '54990', '2019-02-13', 1, 'Sanyo 138.8 cm', 'Resolution: Ultra HD 4K (3840x2160) | Refresh Rate: 60 Hz Display: IPS 4K Display | 1.07 Billion colour palette | HDR 10 Sound: 20W Output | Dolby Digital | Sound Out Feature for Home Theater systems Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices Smart TV Features: Google Certified Android TV | Android Oreo 8.0', NULL, 'Sanyo 138.8 cm', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:51:11', '2019-02-13 23:25:34'),
(107, 'S012', 'KW90005N5P7', 10, 1, NULL, NULL, 1, 1, '2395', '2019-02-13', 1, 'Fastrack Analog Black Dial Women\'s Watch', 'Dial Color: Black, Case Shape: Round, Dial Glass Material: Mineral Band Color: Silver, Band Material: Stainless Steel Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Brass, Case Diameter: 39 millimeters Water Resistance Depth: 30 meters, Buckle Clasp 2 years domestic warranty', NULL, 'Fastrack Analog Black Dial Women\'s Watch', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:57:24', '2019-02-13 23:20:59'),
(108, 'S012', 'KW90005N5P7', 10, 1, NULL, NULL, 1, 1, '1150', '2019-02-13', 1, 'Sonata Analog multicolor', 'Dial Color: Multi Color, Case Shape: Oval Band Color: White, Band Material: Stainless Steel Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Stainless Steel, Case Diameter: 28 millimeters Water Resistance Depth: 5 meters Warranty type: Manufacturer; 1 Year Domestic Warranty', NULL, 'Sonata Analog multicolor', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 17:59:03', '2019-02-20 23:55:29'),
(109, 'S017', 'KY90005N5P7', 10, 1, NULL, NULL, 1, 1, '299', '2019-02-13', 1, 'Addic Analog White Dial', 'Dial Color: White, Case Shape: Round, Dial Glass Material: Glass Band Color: Rose Gold, Band Material: Stainless Steel Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Stainless Steel, Case Diameter: 20 millimeters Water Resistance Depth: Mild Resistance, Not for Swimming meters 6 months manufacturer warranty on manufacturing defects', NULL, 'Addic Analog White Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:03:19', '2019-02-13 23:20:59'),
(110, 'S017', 'KY90005N5P7', 10, 1, NULL, NULL, 1, 1, '825', '2019-02-13', 1, 'MHE Analogue Round Dial', 'Dial Color: White, Case Shape: Round, Dial Glass Material: Glass Band Color: Rose Gold, Band Material: Stainless Steel Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Stainless Steel, Case Diameter: 20 millimeters Water Resistance Depth: Mild Resistance, Not for Swimming meters 6 months manufacturer warranty on manufacturing defects', NULL, 'MHE Analogue Round Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:05:28', '2019-02-20 23:55:29'),
(111, 'S017', 'WD90005N5P7', 10, 1, NULL, NULL, 1, 1, '3910', '2019-02-13', 1, 'Chrono Upgrade Analog Black Dial', 'Dial Color: Black, Case Shape: Round, Dial Glass Material: Mineral Band Color: Silver, Band Material: Stainless Steel Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Stainless Steel, Case Diameter: 52.5 x 48.3 millimeters Water Resistance Depth: 50 meters, Deployment Clasp 1 Year Manufacturing Warranty and 6 Months Battery Warranty', NULL, 'Chrono Upgrade Analog Black Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:10:52', '2019-02-13 23:20:59'),
(112, 'S017', 'WD90005N5P7', 10, 1, NULL, NULL, 1, 1, '299', '2019-02-13', 1, 'Espoir Analog White Dial', 'Dial Color: White, Case Shape: Round, Dial Glass Material: Glass Band Color: Orange, Band Material: Leather Watch Movement Type: Quartz, Watch Display Type: Analog Case Material: Metal, Case Diameter: 40 mm millimeters Water Resistance Depth: 3 meter 6 months warranty', NULL, 'Espoir Analog White Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 18:12:35', '2019-02-13 23:20:59'),
(113, 'S017', 'WD90005N5P7', 10, 1, NULL, NULL, 1, 1, '1995', '2019-02-13', 1, 'Reflex 2.0 Digital Black Dial', 'Dial Color: Black, Case Shape: Rectangular, Dial Glass Material: Acrylic Band Color: Black, Band Material: TPU Watch Movement Type: processor, Watch Display Type: Digital Case Material: Plastic, Case Diameter: 50 millimeters Touch screen; Note: Please charge the device completely before use 1 year manufacturer warranty on manufacturing defects For technical issues kindly contact_us on : [ 1800-266-0123 ] It tracks the number of steps you have taken, the total distance you have travelled and the number of calories that you have burned It helps you to have an active lifestyle with an inbuilt sedentary reminder which you can customise as per your lifestyle', NULL, 'Reflex 2.0 Digital Black Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:15:21', '2019-02-13 23:20:59'),
(114, 'S019', 'WD90005N5P7', 10, 1, NULL, NULL, 1, 1, '2450', '2019-02-13', 1, 'SKMEI Sports Digital Black Dial', 'Dial Color: Black, Case Shape: Rectangular, Dial Glass Material: Acrylic Band Color: Black, Band Material: TPU Watch Movement Type: processor, Watch Display Type: Digital Case Material: Plastic, Case Diameter: 50 millimeters Touch screen; Note: Please charge the device completely before use 1 year manufacturer warranty on manufacturing defects For technical issues kindly contact_us on : [ 1800-266-0123 ] It tracks the number of steps you have taken, the total distance you have travelled and the number of calories that you have burned It helps you to have an active lifestyle with an inbuilt sedentary reminder which you can customise as per your lifestyle', NULL, 'SKMEI Sports Digital Black Dial', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:16:27', '2019-02-13 23:20:59'),
(115, 'S019', 'Dv90005N5P7', 10, 1, NULL, NULL, 1, 1, '799', '2019-02-13', 1, 'Cotton Full Sleeve Plain Men Tshirt', '100% COTTON MATERIAL || FULL SLEEVE T-SHIRT MFG : Flat Knitting || Wash Care : Dry Clean Only, Do not wring This Product Uniquely designed by SDK Fashion. Disclaimer :- PRODUCT COLOR MAY SLIGHTLY VARY DUE TO PHOTOGRAPHIC LIGHTING SOURCES OR YOUR MONITOR SETTINGS. SDK Fashion', NULL, 'Cotton Full Sleeve Plain Men Tshirt', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 18:20:29', '2019-02-13 23:20:59'),
(116, 'S020', 'Dv90005N5P7', 10, 1, NULL, NULL, 1, 1, '449', '2019-02-13', 1, 'Jockey Men\'s Cotton T-Shirt', 'Product comes in assorted prints. Actual colors and prints might vary for the image shown on the website Collection: 24 x 7 ; Style no: 2714 80% cotton & 20% poly Premium Combed Cotton rich fabric Modern fit Ribbed crew-neck prevents sagging Authentic Jockey logo label To be worn as loungewear leisurewear sportswear and innerwear', NULL, 'Jockey Men\'s Cotton T-Shirt', NULL, NULL, NULL, 1, 9, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:24:35', '2019-02-13 23:20:59'),
(117, 'S020', 'FP90005N5P7', 10, 1, NULL, NULL, 1, 1, '399', '2019-02-13', 1, 'PAUSE Men\'s High Neck Full Sleeve', 'Care Instructions: Wash With Like Colors, Do Not Dry Clean, Do not Tumble Dry, Dry in Shade, Smooth Hand Wash.Fit Type: Slim Fit 100% Cotton Soft Comfortable and Cool T Shirt Slim Fit , Casual Wear T Shirt Biker Jacket , Mask T ShirtPerfectly Tailored to Give you the Perfect Shape M - 38 chest 27.5 Length Inches, L- 41 chest 28.5 Length Inches, XL - 42 chest .5 Length Inches, XXL- 44 chest 31 Length Inchesr', NULL, 'PAUSE Men\'s High Neck Full Sleeve', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 18:26:38', '2019-02-13 23:25:36'),
(119, 'S028', 'FP90005N5P7', 10, 1, NULL, NULL, 1, 1, '1749', '2019-02-13', 1, 'Levi\'s Men\'s Slim Fit', 'Color: Brown,Fit Type: Slim Fit 97% Cotton and 3% elastane Zip fly with button closure, Slim fit, Hand wash Made in India', NULL, 'Levi\'s Men\'s Slim Fit', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 18:36:59', '2019-02-13 23:25:36'),
(120, 'S030', 'FP90005N5P7', 10, 1, NULL, NULL, 1, 1, '1159', '2019-02-13', 1, 'Pepe Jeans Men\'s Slim Fit', 'Color: Brown,Fit Type: Slim Fit 97% Cotton and 3% elastane Zip fly with button closure, Slim fit, Hand wash Made in India', NULL, 'Pepe Jeans Men\'s Slim Fit', NULL, NULL, NULL, 1, 9, 'India', 0, 0, 1, 1, 1, NULL, NULL, '2019-02-13 18:39:37', '2019-02-13 23:25:36'),
(121, 'S030', 'FP90005N5P7', 9, 1, NULL, NULL, 1, 1, '1345', '2019-02-13', 1, 'Wrangler Men\'s Slim Fit Jeans', 'Color: Brown,Fit Type: Slim Fit 97% Cotton and 3% elastane Zip fly with button closure, Belt closure Machine wash, Low-Rise Slim fit, Hand wash Made in India', NULL, 'Wrangler Men\'s Slim Fit Jeans', NULL, NULL, NULL, 1, 5, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:42:08', '2019-02-13 23:25:36'),
(122, 'S031', 'FP90005N5P7', 9, 1, NULL, NULL, 1, 1, '870', '2019-02-13', 1, 'Shaded Side Red Stripe Stitching Denim Jeans', 'Brand: Campus Sutra Shaded Side Red Stripe Stitching Jeans Pant Casual Wear, Daily Wear, Stylish Wear Ideal for men Gentle Machine Wash', NULL, 'Shaded Side Red Stripe Stitching Denim Jeans', NULL, NULL, NULL, 1, 5, 'India', 0, 0, NULL, 1, 1, NULL, NULL, '2019-02-13 18:44:22', '2019-02-13 23:25:36');

-- --------------------------------------------------------

--
-- Table structure for table `product_description`
--

CREATE TABLE `product_description` (
  `product_description_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `meta_description` text,
  `meta_keyword` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

CREATE TABLE `product_discount` (
  `product_discount_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(4) NOT NULL,
  `priority` int(5) NOT NULL,
  `price` decimal(15,4) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `sort_order` int(3) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`product_image_id`, `product_id`, `image`, `container_name`, `sort_order`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(47, 95, 'Img_1550086357228.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:07:06', NULL),
(48, 95, 'Img_1550086357229.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:07:06', NULL),
(49, 95, 'Img_1550086357230.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:07:06', NULL),
(54, 97, 'Img_1550086357238.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:14:02', NULL),
(55, 97, 'Img_1550086357235.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:14:02', NULL),
(56, 97, 'Img_1550086357236.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:14:02', NULL),
(57, 97, 'Img_1550086357237.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:14:02', NULL),
(58, 98, 'Img_1550086357239.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:18:26', NULL),
(59, 98, 'Img_1550086357240.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:18:26', NULL),
(60, 98, 'Img_1550086357241.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:18:26', NULL),
(61, 99, 'Img_1550086357218.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:22:22', NULL),
(62, 99, 'Img_1550086357215.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:22:22', NULL),
(63, 99, 'Img_1550086357216.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:22:22', NULL),
(64, 99, 'Img_1550086357217.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:22:22', NULL),
(65, 100, 'Img_1550086357216.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:28:01', NULL),
(66, 100, 'Img_1550086357219.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:28:01', NULL),
(67, 100, 'Img_1550086357218.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:28:02', NULL),
(68, 101, 'Img_1550086357123.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:30:38', NULL),
(69, 101, 'Img_1550086357120.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:30:38', NULL),
(70, 101, 'Img_1550086357121.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:30:38', NULL),
(71, 101, 'Img_1550086357122.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:30:38', NULL),
(72, 102, 'Img_1550086357227.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:33:19', NULL),
(73, 102, 'Img_1550086357224.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:33:19', NULL),
(74, 102, 'Img_1550086357225.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:33:19', NULL),
(75, 102, 'Img_1550086357226.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:33:19', NULL),
(76, 103, 'Img_1550086357260.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:44:00', NULL),
(77, 103, 'Img_1550086357257.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:44:00', NULL),
(78, 103, 'Img_1550086357258.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:44:00', NULL),
(79, 103, 'Img_1550086357259.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:44:00', NULL),
(80, 104, 'Img_1550086357264.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:47:05', NULL),
(81, 104, 'Img_1550086357261.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:47:05', NULL),
(82, 104, 'Img_1550086357262.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:47:05', NULL),
(83, 104, 'Img_1550086357263.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:47:05', NULL),
(84, 105, 'Img_1550086357268.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:48:05', NULL),
(85, 105, 'Img_1550086357265.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:48:05', NULL),
(86, 105, 'Img_1550086357266.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:48:05', NULL),
(87, 105, 'Img_1550086357267.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:48:05', NULL),
(88, 106, 'Img_1550086357273.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:51:11', NULL),
(89, 106, 'Img_1550086357270.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:51:11', NULL),
(90, 106, 'Img_1550086357271.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:51:11', NULL),
(91, 106, 'Img_1550086357272.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:51:11', NULL),
(92, 107, 'Img_1550086357294.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:57:24', NULL),
(93, 107, 'Img_1550086357291.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:57:24', NULL),
(94, 107, 'Img_1550086357292.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:57:24', NULL),
(95, 107, 'Img_1550086357293.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:57:24', NULL),
(96, 108, 'Img_1550086357298.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:59:03', NULL),
(97, 108, 'Img_1550086357295.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:59:03', NULL),
(98, 108, 'Img_155008635729.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:59:03', NULL),
(99, 108, 'Img_1550086357297.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 17:59:03', NULL),
(100, 109, 'Img_1550086357302.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:03:20', NULL),
(101, 109, 'Img_1550086357299.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:03:20', NULL),
(102, 109, 'Img_1550086357300.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:03:20', NULL),
(103, 109, 'Img_1550086357301.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:03:20', NULL),
(104, 110, 'Img_1550086357306.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:05:28', NULL),
(105, 110, 'Img_1550086357303.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:05:28', NULL),
(106, 110, 'Img_1550086357304.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:05:28', NULL),
(107, 110, 'Img_1550086357305.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:05:28', NULL),
(108, 111, 'Img_1550086357278.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:10:52', NULL),
(109, 111, 'Img_1550086357274.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:10:52', NULL),
(110, 111, 'Img_1550086357275.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:10:52', NULL),
(111, 111, 'Img_1550086357276.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:10:52', NULL),
(112, 112, 'Img_1550086357281.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:12:35', NULL),
(113, 112, 'Img_1550086357279.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:12:35', NULL),
(114, 112, 'Img_1550086357280.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:12:35', NULL),
(115, 112, 'Img_1550086357281.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:12:35', NULL),
(116, 113, 'Img_1550086357286.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:15:21', NULL),
(117, 113, 'Img_1550086357283.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:15:21', NULL),
(118, 113, 'Img_1550086357284.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:15:21', NULL),
(119, 113, 'Img_1550086357285.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:15:21', NULL),
(120, 114, 'Img_1550086357290.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:16:27', NULL),
(121, 114, 'Img_1550086357287.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:16:27', NULL),
(122, 114, 'Img_1550086357288.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:16:27', NULL),
(123, 114, 'Img_1550086357289.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:16:27', NULL),
(124, 115, 'Img_1550086357228.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:20:29', NULL),
(125, 115, 'Img_1550086357229.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:20:29', NULL),
(126, 115, 'Img_1550086357230.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:20:29', NULL),
(127, 116, 'Img_1550086357234.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:24:35', NULL),
(128, 116, 'Img_1550086357231.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:24:35', NULL),
(129, 116, 'Img_1550086357232.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:24:35', NULL),
(130, 116, 'Img_1550086357233.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:24:35', NULL),
(131, 117, 'Img_1550086357238.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:26:38', NULL),
(132, 117, 'Img_1550086357235.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:26:38', NULL),
(133, 117, 'Img_1550086357236.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:26:38', NULL),
(134, 117, 'Img_1550086357237.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:26:38', NULL),
(139, 119, 'Img_1550086357245.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:36:59', NULL),
(140, 119, 'Img_1550086357242.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:36:59', NULL),
(141, 119, 'Img_1550086357243.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:36:59', NULL),
(142, 119, 'Img_1550086357244.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:36:59', NULL),
(143, 120, 'Img_1550086357249.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:39:37', NULL),
(144, 120, 'Img_1550086357246.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:39:37', NULL),
(145, 120, 'Img_1550086357247.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:39:37', NULL),
(146, 120, 'Img_1550086357248.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:39:37', NULL),
(147, 121, 'Img_1550086357253.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:42:08', NULL),
(148, 121, 'Img_1550086357250.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:42:08', NULL),
(149, 121, 'Img_1550086357251.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:42:08', NULL),
(150, 121, 'Img_1550086357252.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:42:08', NULL),
(151, 122, 'Img_1550086357254.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:44:22', NULL),
(152, 122, 'Img_1550086357255.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:44:22', NULL),
(153, 122, 'Img_1550086357256.jpg', 'product/', NULL, NULL, NULL, NULL, '2019-02-13 18:44:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_rating`
--

CREATE TABLE `product_rating` (
  `rating_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `first_name` varchar(512) DEFAULT NULL,
  `last_name` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `review` text NOT NULL,
  `image_path` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_related`
--

CREATE TABLE `product_related` (
  `related_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `related_product_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_related`
--

INSERT INTO `product_related` (`related_id`, `product_id`, `related_product_id`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(4, 97, 98, NULL, NULL, NULL, '2019-02-14 00:40:34', NULL),
(6, 97, 95, NULL, NULL, NULL, '2019-02-14 00:41:50', NULL),
(7, 95, 97, NULL, NULL, NULL, '2019-02-14 00:42:00', NULL),
(8, 95, 98, NULL, NULL, NULL, '2019-02-14 00:42:03', NULL),
(9, 98, 95, NULL, NULL, NULL, '2019-02-14 00:42:14', NULL),
(11, 99, 100, NULL, NULL, NULL, '2019-02-14 00:44:21', NULL),
(12, 99, 101, NULL, NULL, NULL, '2019-02-14 00:44:24', NULL),
(13, 99, 102, NULL, NULL, NULL, '2019-02-14 00:44:27', NULL),
(14, 100, 99, NULL, NULL, NULL, '2019-02-14 00:44:34', NULL),
(15, 100, 101, NULL, NULL, NULL, '2019-02-14 00:44:37', NULL),
(16, 100, 102, NULL, NULL, NULL, '2019-02-14 00:44:40', NULL),
(17, 101, 99, NULL, NULL, NULL, '2019-02-14 00:45:34', NULL),
(18, 101, 100, NULL, NULL, NULL, '2019-02-14 00:45:38', NULL),
(19, 101, 102, NULL, NULL, NULL, '2019-02-14 00:45:41', NULL),
(20, 102, 99, NULL, NULL, NULL, '2019-02-14 00:45:48', NULL),
(21, 102, 100, NULL, NULL, NULL, '2019-02-14 00:45:50', NULL),
(22, 102, 101, NULL, NULL, NULL, '2019-02-14 00:45:53', NULL),
(23, 103, 104, NULL, NULL, NULL, '2019-02-14 00:48:08', NULL),
(24, 103, 105, NULL, NULL, NULL, '2019-02-14 00:48:12', NULL),
(25, 103, 106, NULL, NULL, NULL, '2019-02-14 00:48:16', NULL),
(26, 103, 107, NULL, NULL, NULL, '2019-02-14 00:48:21', NULL),
(27, 104, 103, NULL, NULL, NULL, '2019-02-14 00:48:31', NULL),
(28, 104, 105, NULL, NULL, NULL, '2019-02-14 00:48:34', NULL),
(29, 104, 106, NULL, NULL, NULL, '2019-02-14 00:48:37', NULL),
(30, 105, 103, NULL, NULL, NULL, '2019-02-14 00:48:50', NULL),
(31, 105, 104, NULL, NULL, NULL, '2019-02-14 00:48:54', NULL),
(32, 105, 106, NULL, NULL, NULL, '2019-02-14 00:48:57', NULL),
(33, 106, 103, NULL, NULL, NULL, '2019-02-14 00:49:14', NULL),
(34, 106, 104, NULL, NULL, NULL, '2019-02-14 00:49:16', NULL),
(35, 106, 105, NULL, NULL, NULL, '2019-02-14 00:49:22', NULL),
(36, 95, 97, NULL, NULL, NULL, '2019-02-17 22:55:50', NULL),
(37, 95, 98, NULL, NULL, NULL, '2019-02-17 22:55:55', NULL),
(38, 107, 108, NULL, NULL, NULL, '2019-02-17 23:20:00', NULL),
(39, 107, 109, NULL, NULL, NULL, '2019-02-17 23:20:03', NULL),
(40, 107, 110, NULL, NULL, NULL, '2019-02-17 23:20:33', NULL),
(41, 108, 107, NULL, NULL, NULL, '2019-02-17 23:20:42', NULL),
(42, 108, 109, NULL, NULL, NULL, '2019-02-17 23:20:45', NULL),
(43, 108, 110, NULL, NULL, NULL, '2019-02-17 23:20:48', NULL),
(44, 109, 107, NULL, NULL, NULL, '2019-02-17 23:20:55', NULL),
(45, 109, 108, NULL, NULL, NULL, '2019-02-17 23:20:58', NULL),
(46, 109, 110, NULL, NULL, NULL, '2019-02-17 23:21:01', NULL),
(47, 110, 107, NULL, NULL, NULL, '2019-02-17 23:21:08', NULL),
(48, 110, 108, NULL, NULL, NULL, '2019-02-17 23:21:23', NULL),
(49, 110, 109, NULL, NULL, NULL, '2019-02-17 23:21:26', NULL),
(50, 111, 112, NULL, NULL, NULL, '2019-02-17 23:21:42', NULL),
(51, 111, 113, NULL, NULL, NULL, '2019-02-17 23:21:44', NULL),
(52, 111, 114, NULL, NULL, NULL, '2019-02-17 23:21:47', NULL),
(53, 112, 111, NULL, NULL, NULL, '2019-02-17 23:21:55', NULL),
(54, 112, 113, NULL, NULL, NULL, '2019-02-17 23:21:57', NULL),
(55, 112, 114, NULL, NULL, NULL, '2019-02-17 23:21:59', NULL),
(56, 113, 111, NULL, NULL, NULL, '2019-02-17 23:22:05', NULL),
(57, 113, 112, NULL, NULL, NULL, '2019-02-17 23:22:07', NULL),
(58, 113, 114, NULL, NULL, NULL, '2019-02-17 23:22:09', NULL),
(59, 114, 111, NULL, NULL, NULL, '2019-02-17 23:22:14', NULL),
(60, 114, 112, NULL, NULL, NULL, '2019-02-17 23:22:18', NULL),
(61, 114, 113, NULL, NULL, NULL, '2019-02-17 23:22:20', NULL),
(62, 115, 116, NULL, NULL, NULL, '2019-02-17 23:23:17', NULL),
(63, 115, 117, NULL, NULL, NULL, '2019-02-17 23:23:22', NULL),
(64, 115, 118, NULL, NULL, NULL, '2019-02-17 23:23:25', NULL),
(65, 116, 115, NULL, NULL, NULL, '2019-02-17 23:23:32', NULL),
(66, 116, 117, NULL, NULL, NULL, '2019-02-17 23:23:34', NULL),
(67, 116, 118, NULL, NULL, NULL, '2019-02-17 23:23:43', NULL),
(68, 117, 115, NULL, NULL, NULL, '2019-02-17 23:23:51', NULL),
(69, 117, 116, NULL, NULL, NULL, '2019-02-17 23:23:54', NULL),
(70, 117, 118, NULL, NULL, NULL, '2019-02-17 23:23:56', NULL),
(73, 119, 115, NULL, NULL, NULL, '2019-02-17 23:25:18', NULL),
(74, 120, 122, NULL, NULL, NULL, '2019-02-17 23:25:53', NULL),
(75, 121, 120, NULL, NULL, NULL, '2019-02-17 23:26:10', NULL),
(76, 121, 122, NULL, NULL, NULL, '2019-02-17 23:26:13', NULL),
(77, 122, 121, NULL, NULL, NULL, '2019-02-17 23:26:21', NULL),
(78, 122, 120, NULL, NULL, NULL, '2019-02-17 23:26:23', NULL),
(79, 120, 121, NULL, NULL, NULL, '2019-02-17 23:27:17', NULL),
(80, 99, 121, NULL, NULL, NULL, '2019-02-17 23:29:05', NULL),
(81, 95, 97, NULL, NULL, NULL, '2019-02-17 23:50:27', NULL),
(82, 95, 98, NULL, NULL, NULL, '2019-02-17 23:50:35', NULL),
(83, 97, 98, NULL, NULL, NULL, '2019-02-17 23:50:42', NULL),
(84, 97, 95, NULL, NULL, NULL, '2019-02-17 23:50:45', NULL),
(85, 98, 95, NULL, NULL, NULL, '2019-02-17 23:50:49', NULL),
(86, 98, 97, NULL, NULL, NULL, '2019-02-17 23:50:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_tag`
--

CREATE TABLE `product_tag` (
  `product_tag_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_tagname` text,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_to_category`
--

CREATE TABLE `product_to_category` (
  `product_to_category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_to_category`
--

INSERT INTO `product_to_category` (`product_to_category_id`, `product_id`, `category_id`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(179, 95, 4, 1, NULL, NULL, '2019-02-13 17:07:06', NULL),
(180, 95, 5, 1, NULL, NULL, '2019-02-13 17:07:06', NULL),
(183, 97, 4, 1, NULL, NULL, '2019-02-13 17:14:02', NULL),
(184, 97, 5, 1, NULL, NULL, '2019-02-13 17:14:02', NULL),
(185, 98, 4, 1, NULL, NULL, '2019-02-13 17:18:26', NULL),
(186, 98, 5, 1, NULL, NULL, '2019-02-13 17:18:26', NULL),
(187, 99, 5, 1, NULL, NULL, '2019-02-13 17:22:22', NULL),
(188, 99, 4, 1, NULL, NULL, '2019-02-13 17:22:22', NULL),
(189, 100, 5, 1, NULL, NULL, '2019-02-13 17:28:01', NULL),
(190, 100, 4, 1, NULL, NULL, '2019-02-13 17:28:01', NULL),
(191, 101, 5, 1, NULL, NULL, '2019-02-13 17:30:38', NULL),
(192, 101, 4, 1, NULL, NULL, '2019-02-13 17:30:38', NULL),
(193, 102, 5, 1, NULL, NULL, '2019-02-13 17:33:19', NULL),
(194, 102, 4, 1, NULL, NULL, '2019-02-13 17:33:19', NULL),
(195, 103, 7, 1, NULL, NULL, '2019-02-13 17:44:00', NULL),
(196, 103, 5, 1, NULL, NULL, '2019-02-13 17:44:00', NULL),
(197, 104, 7, 1, NULL, NULL, '2019-02-13 17:47:05', NULL),
(198, 104, 5, 1, NULL, NULL, '2019-02-13 17:47:05', NULL),
(199, 105, 7, 1, NULL, NULL, '2019-02-13 17:48:05', NULL),
(200, 105, 5, 1, NULL, NULL, '2019-02-13 17:48:05', NULL),
(201, 106, 7, 1, NULL, NULL, '2019-02-13 17:51:11', NULL),
(202, 106, 5, 1, NULL, NULL, '2019-02-13 17:51:11', NULL),
(203, 107, 6, 1, NULL, NULL, '2019-02-13 17:57:24', NULL),
(204, 107, 9, 1, NULL, NULL, '2019-02-13 17:57:24', NULL),
(205, 108, 6, 1, NULL, NULL, '2019-02-13 17:59:03', NULL),
(206, 108, 9, 1, NULL, NULL, '2019-02-13 17:59:03', NULL),
(207, 109, 6, 1, NULL, NULL, '2019-02-13 18:03:20', NULL),
(208, 109, 9, 1, NULL, NULL, '2019-02-13 18:03:20', NULL),
(209, 110, 6, 1, NULL, NULL, '2019-02-13 18:05:28', NULL),
(210, 110, 9, 1, NULL, NULL, '2019-02-13 18:05:28', NULL),
(211, 111, 6, 1, NULL, NULL, '2019-02-13 18:10:52', NULL),
(212, 111, 9, 1, NULL, NULL, '2019-02-13 18:10:52', NULL),
(213, 112, 6, 1, NULL, NULL, '2019-02-13 18:12:35', NULL),
(214, 112, 9, 1, NULL, NULL, '2019-02-13 18:12:35', NULL),
(215, 113, 6, 1, NULL, NULL, '2019-02-13 18:15:21', NULL),
(216, 113, 9, 1, NULL, NULL, '2019-02-13 18:15:21', NULL),
(217, 114, 6, 1, NULL, NULL, '2019-02-13 18:16:27', NULL),
(218, 114, 9, 1, NULL, NULL, '2019-02-13 18:16:27', NULL),
(219, 115, 8, 1, NULL, NULL, '2019-02-13 18:20:29', NULL),
(220, 115, 6, 1, NULL, NULL, '2019-02-13 18:20:29', NULL),
(221, 116, 8, 1, NULL, NULL, '2019-02-13 18:24:35', NULL),
(222, 116, 6, 1, NULL, NULL, '2019-02-13 18:24:35', NULL),
(223, 117, 8, 1, NULL, NULL, '2019-02-13 18:26:38', NULL),
(224, 117, 6, 1, NULL, NULL, '2019-02-13 18:26:38', NULL),
(227, 119, 8, 1, NULL, NULL, '2019-02-13 18:36:59', NULL),
(228, 119, 6, 1, NULL, NULL, '2019-02-13 18:36:59', NULL),
(229, 120, 8, 1, NULL, NULL, '2019-02-13 18:39:37', NULL),
(230, 120, 6, 1, NULL, NULL, '2019-02-13 18:39:37', NULL),
(231, 121, 8, 1, NULL, NULL, '2019-02-13 18:42:08', NULL),
(232, 121, 6, 1, NULL, NULL, '2019-02-13 18:42:08', NULL),
(233, 122, 8, 1, NULL, NULL, '2019-02-13 18:44:22', NULL),
(234, 122, 6, 1, NULL, NULL, '2019-02-13 18:44:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `settings_id` int(11) NOT NULL,
  `url` varchar(250) DEFAULT NULL,
  `meta_tag_title` varchar(250) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keywords` varchar(250) DEFAULT NULL,
  `store_name` varchar(250) DEFAULT NULL,
  `store_owner` varchar(250) DEFAULT NULL,
  `store_address` text,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `store_email` varchar(250) DEFAULT NULL,
  `store_telephone` varchar(50) DEFAULT NULL,
  `store_fax` varchar(30) DEFAULT NULL,
  `store_logo` varchar(250) DEFAULT NULL,
  `store_logo_path` varchar(255) DEFAULT NULL,
  `maintenance_mode` int(3) DEFAULT NULL,
  `store_language_name` varchar(250) DEFAULT NULL,
  `store_currency_id` int(11) DEFAULT NULL,
  `store_image` varchar(255) DEFAULT NULL,
  `store_image_path` text,
  `google` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `order_status` int(11) NOT NULL DEFAULT '1',
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`settings_id`, `url`, `meta_tag_title`, `meta_tag_description`, `meta_tag_keywords`, `store_name`, `store_owner`, `store_address`, `country_id`, `zone_id`, `store_email`, `store_telephone`, `store_fax`, `store_logo`, `store_logo_path`, `maintenance_mode`, `store_language_name`, `store_currency_id`, `store_image`, `store_image_path`, `google`, `facebook`, `twitter`, `instagram`, `order_status`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(2, NULL, NULL, NULL, NULL, 'siva', 'sijh', 'oow', 7, 40, 'wewe', '43434', NULL, 'Img_1550663579489.jpeg', 'storeLogo/', NULL, 'Tamil', 26, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAAAMACAIAAABAXKuVAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAAIABJREFUeJzs3XdcU9fbAPDnjuwEQhIg7D0UFXDixq11r2rVtrbWtnbb3V/bt3tYbWtrbbXWVmut1jqpe4GCigICIsjeI0AIgayb5I73jyilgFtE2/P9t', NULL, 'https://plus.google.com/106505712715559114904', 'https://www.facebook.com/spurtcommerce/', 'https://twitter.com/Spurtcommerce', 'https://www.instagram.com/spurt_commerce/', 1, NULL, '2019-02-13 06:00:00', '2019-02-13 07:51:17', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_status`
--

CREATE TABLE `stock_status` (
  `stock_status_id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock_status`
--

INSERT INTO `stock_status` (`stock_status_id`, `name`, `is_active`, `created_by`, `modified_by`, `created_date`, `modified_date`) VALUES
(1, 'Instock', 1, NULL, NULL, NULL, NULL),
(2, 'out of Stock', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` bigint(20) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_group_id`, `username`, `password`, `first_name`, `last_name`, `email`, `avatar`, `avatar_path`, `code`, `ip`, `address`, `phone_number`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 1, 'admin@piccocart.com', '$2a$10$BIXP6H/VAhXn3berp29R7u7aHBb/BCYKkAZIaJPQHAjlFaamaiGg.', 'spurt', 'commerce', 'admin@piccocart.com', NULL, NULL, NULL, NULL, NULL, NULL, 1, '2019-02-13 23:02:26', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `slug` varchar(64) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `name`, `slug`, `is_active`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'Admin', 'optional', 0, '2019-01-21 10:38:14', '2019-02-12 03:18:49', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `zone_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `code` varchar(32) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zone_to_geo_zone`
--

CREATE TABLE `zone_to_geo_zone` (
  `zone_to_geo_zone_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `geo_zone_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`),
  ADD KEY `fk_BannerGroup_Banner` (`banner_group_id`);

--
-- Indexes for table `banner_group`
--
ALTER TABLE `banner_group`
  ADD PRIMARY KEY (`banner_group_id`);

--
-- Indexes for table `banner_image`
--
ALTER TABLE `banner_image`
  ADD PRIMARY KEY (`banner_image_id`);

--
-- Indexes for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD PRIMARY KEY (`banner_image_description_id`),
  ADD KEY `fk_Banner_BannerImageDescription` (`banner_id`),
  ADD KEY `fk_BannerImage_BannerImageDescription` (`banner_image_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_description`
--
ALTER TABLE `category_description`
  ADD PRIMARY KEY (`category_description_id`),
  ADD KEY `fk_Category_CategoryDescription` (`category_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`currency_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_group`
--
ALTER TABLE `customer_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_ip`
--
ALTER TABLE `customer_ip`
  ADD PRIMARY KEY (`customer_ip_id`);

--
-- Indexes for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD PRIMARY KEY (`customer_transaction_id`),
  ADD KEY `fk_customer_transaction_order1` (`order_id`),
  ADD KEY `fk_customer_transaction_customer1` (`customer_id`);

--
-- Indexes for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `email_template`
--
ALTER TABLE `email_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `geo_zone`
--
ALTER TABLE `geo_zone`
  ADD PRIMARY KEY (`geo_zone_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`);

--
-- Indexes for table `login_log`
--
ALTER TABLE `login_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_order_customer1` (`customer_id`),
  ADD KEY `fk_order_currency1` (`currency_id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`order_history_id`),
  ADD KEY `fk_order_history_order1` (`order_id`),
  ADD KEY `fk_order_history_order_status1` (`order_status_id`);

--
-- Indexes for table `order_log`
--
ALTER TABLE `order_log`
  ADD PRIMARY KEY (`order_log_id`),
  ADD KEY `fk_order_customer1` (`customer_id`),
  ADD KEY `fk_order_currency1` (`currency_id`);

--
-- Indexes for table `order_option`
--
ALTER TABLE `order_option`
  ADD PRIMARY KEY (`order_option_id`),
  ADD KEY `fk_order_option_order1` (`order_id`),
  ADD KEY `fk_order_option_order_product1` (`order_product_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `fk_order_product_product1` (`product_id`),
  ADD KEY `fk_order_product_order1` (`order_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `order_total`
--
ALTER TABLE `order_total`
  ADD PRIMARY KEY (`order_total_id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`page_id`),
  ADD KEY `fk_page_page_group1` (`page_group_id`);

--
-- Indexes for table `page_group`
--
ALTER TABLE `page_group`
  ADD PRIMARY KEY (`page_group_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_description`
--
ALTER TABLE `product_description`
  ADD PRIMARY KEY (`product_description_id`);

--
-- Indexes for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD PRIMARY KEY (`product_discount_id`),
  ADD KEY `fk_product_discount_product1` (`product_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_image_id`),
  ADD KEY `fk_product_image_product1` (`product_id`);

--
-- Indexes for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `fk_product_rating_product1` (`product_id`);

--
-- Indexes for table `product_related`
--
ALTER TABLE `product_related`
  ADD PRIMARY KEY (`related_id`),
  ADD KEY `fk_product_related_product1` (`product_id`);

--
-- Indexes for table `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`product_tag_id`);

--
-- Indexes for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD PRIMARY KEY (`product_to_category_id`),
  ADD KEY `fk_product_to_category_product1` (`product_id`),
  ADD KEY `fk_product_to_category_category1` (`category_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`settings_id`),
  ADD KEY `fk_Country_Settings` (`country_id`);

--
-- Indexes for table `stock_status`
--
ALTER TABLE `stock_status`
  ADD PRIMARY KEY (`stock_status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_usergroup` (`user_group_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`zone_id`),
  ADD KEY `fk_Zone_Country` (`country_id`);

--
-- Indexes for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  ADD PRIMARY KEY (`zone_to_geo_zone_id`),
  ADD KEY `fk_Zone_ZoneGeo` (`zone_id`),
  ADD KEY `fk_Country_ZoneGeo` (`country_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_token`
--
ALTER TABLE `access_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `banner_group`
--
ALTER TABLE `banner_group`
  MODIFY `banner_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner_image`
--
ALTER TABLE `banner_image`
  MODIFY `banner_image_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  MODIFY `banner_image_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `category_description`
--
ALTER TABLE `category_description`
  MODIFY `category_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `customer_group`
--
ALTER TABLE `customer_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_ip`
--
ALTER TABLE `customer_ip`
  MODIFY `customer_ip_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  MODIFY `customer_transaction_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `email_template`
--
ALTER TABLE `email_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `geo_zone`
--
ALTER TABLE `geo_zone`
  MODIFY `geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `login_log`
--
ALTER TABLE `login_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `order_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `order_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `order_option`
--
ALTER TABLE `order_option`
  MODIFY `order_option_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `order_total`
--
ALTER TABLE `order_total`
  MODIFY `order_total_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `page_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `page_group`
--
ALTER TABLE `page_group`
  MODIFY `page_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `product_description`
--
ALTER TABLE `product_description`
  MODIFY `product_description_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_discount`
--
ALTER TABLE `product_discount`
  MODIFY `product_discount_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `product_rating`
--
ALTER TABLE `product_rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_related`
--
ALTER TABLE `product_related`
  MODIFY `related_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `product_tag`
--
ALTER TABLE `product_tag`
  MODIFY `product_tag_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_to_category`
--
ALTER TABLE `product_to_category`
  MODIFY `product_to_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `settings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `stock_status`
--
ALTER TABLE `stock_status`
  MODIFY `stock_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  MODIFY `zone_to_geo_zone_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `fk_BannerGroup_Banner` FOREIGN KEY (`banner_group_id`) REFERENCES `banner_group` (`banner_group_id`) ON DELETE CASCADE;

--
-- Constraints for table `banner_image_description`
--
ALTER TABLE `banner_image_description`
  ADD CONSTRAINT `fk_BannerImage_BannerImageDescription` FOREIGN KEY (`banner_image_id`) REFERENCES `banner_image` (`banner_image_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Banner_BannerImageDescription` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`banner_id`) ON DELETE CASCADE;

--
-- Constraints for table `category_description`
--
ALTER TABLE `category_description`
  ADD CONSTRAINT `fk_Category_CategoryDescription` FOREIGN KEY (`category_id`) REFERENCES `oldcategory` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_transaction`
--
ALTER TABLE `customer_transaction`
  ADD CONSTRAINT `fk_customer_transaction_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_customer_transaction_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_wishlist`
--
ALTER TABLE `customer_wishlist`
  ADD CONSTRAINT `customer_wishlist_Cons_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_wishlist_Cons_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_order_currency1` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `fk_order_history_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_history_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_option`
--
ALTER TABLE `order_option`
  ADD CONSTRAINT `fk_order_option_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_option_order_product1` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `fk_order_product_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `fk_page_page_group1` FOREIGN KEY (`page_group_id`) REFERENCES `page_group` (`page_group_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD CONSTRAINT `fk_product_discount_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `fk_product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD CONSTRAINT `fk_product_rating_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_related`
--
ALTER TABLE `product_related`
  ADD CONSTRAINT `fk_product_related_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD CONSTRAINT `fk_product_to_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product_to_category_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `fk_Country_Settings` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_usergroup` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE;

--
-- Constraints for table `zone`
--
ALTER TABLE `zone`
  ADD CONSTRAINT `fk_Zone_Country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE;

--
-- Constraints for table `zone_to_geo_zone`
--
ALTER TABLE `zone_to_geo_zone`
  ADD CONSTRAINT `fk_Country_ZoneGeo` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Zone_ZoneGeo` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
