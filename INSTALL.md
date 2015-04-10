Installation Instructions
=========================


1: Introduction
===============

ICT-Dialer is a unique and complete voice, fax and sms broadcasting solution featuring Mass voice, sms and fax broadcasting campaigns, agnent campaigns and IVR bassed campaigns


2: Install Basic System Requirements
====================================

 1.  CentOs 6
 2.  Apache 2
 3.  MySQL 5
 4.  PHP 5.3.3
 5.  ICTCore
 6.  Kannel
 7.  FreeSWITCH

To install above requirements, first of all we need to install their respective repositories

```bash
rpm -Uvh 'http://service.ictinnovations.com/repo/6/ict-release-6-2.noarch.rpm'
rpm -Uvh 'http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm'
rpm -Uvh 'http://files.freeswitch.org/freeswitch-release-1-0.noarch.rpm'
```

Before proceeding further please disable selinux and to disable it permanently edit /etc/selinux/config file

```bash
setenforce 0
```

3: ICTCore Installation
=======================
ICTCore is main dependency of ICTDialer, if you have proper repositories pre installed (see above) then all other dependencies will be installed along with ICTCore. so we just need to issue following command

```bash
yum -y install ictcore ictcore-voice ictcore-fax ictcore-sms
```

### 3.1 Setup ICTCore database
To create database in mysql for ictcore issue following commands at mysql prompt

```bash
CREATE DATABASE ictdialer;
USE ictdialer;
GRANT ALL PRIVILEGES ON ictdialer.* TO ictdialeruser@localhost IDENTIFIED BY 'plsChangeIt';
FLUSH PRIVILEGES;

SOURCE /usr/ictcore/db/database.sql;
SOURCE /usr/ictcore/db/voice.sql;
SOURCE /usr/ictcore/db/fax.sql;
SOURCE /usr/ictcore/db/sms.sql;
```

Now update /usr/ictcore/etc/ictcore.conf and /usr/ictcore/etc/odbc.ini files as per above created database


4: ICTDialer Installation
=========================
1. (if any) delete /usr/ictdialer
2. Download, ictdialer folders into temp folder
3. move ICTDialer wwwroot folder into /usr/ictdialer
4. move broadcast folder into /usr/ictdialer/sites/all/modules
5. issue following command to create website configuration file
```bash
cp /usr/ictdialer/sites/default/default.settings.php /usr/ictdialer/sites/default/settings.php
chown -R apache:apache /usr/ictdialer
```
6. Update Apache configurations to set /usr/ictdialer as DocumentRoot
7. restart Apache

### 4.1 Frontend / Web GUI
1. Now visit http://DOMAIN.COM/ and follow the installation instructions for ICTDialer (drupal based) front end installation.
2. When asked for database please provide access info to recently created database ( in ictcore section ) and enter `web_` as database prefix
2. Once you are done with installation, visit the website and login as site administrator with username and password that you provided during installation.
4. Now comeback to Web GUI and go to Modules menu and enable all modules in __ICTCore System__ Package.
5. And also enable __Chaos tools__ Package.
6. Now enable all modules under __ICTDialer System__ Package.
7. Now you'll see new menu items for Campaigns, Message creation, ICTCore System and others in your Navigation Menu.

### 4.2 User Synchronization
After installation issue following command against ictdialer database, to synchronize ICTDialer users with ICTCore

```sql
INSERT INTO usr SELECT NULL, NULL, name, pass, NULL, NULL, NULL, NULL, NULL, mail, NULL, NULL, NULL, NULL, NULL, 1, UNIX_TIMESTAMP(), 1, NULL, NULL FROM web_users WHERE uid > 0;
```

5: First Campaign
=================

### 5.1: Setup Terminiation and user accounts
1. Login as admin
2. Add gateway / trunk for outgoing call / termination at "ICTCore System" => "Provider Trunks"
3. Currently, in ICTDialer 2.0 only one gateway/trunk will be used for calling. Currently routing is not supported.
4. Register (Sign up) a new user by registering from http://DOMAIN.COM/ictdialer/?q=user/register. Directly adding user from admin=>people is not supported. Once user is registered, it is blocked by default. Login in as admin and Activate it from admin=>People. (Sign up process can be changed from admin => configuration => Account settings. 
5. Logout

### 5.2 Start First Campaign
1. Login as newly created user
2. Upload voice recording using menu "Broadcast => Manage files => Recording files => Create New"
3. Upload Contacts using menu "Broadcast => Contacts => Contact => Create New"
4. Create a new campaign using menu "Broadcast => Campaigns => Create new campaign"
5. From next screen select "Voice Campaign"
6. In campaign form select recently create recording under "Pre Recorded Message"
7. And select recently created contact from "Contacts"
8. Save/Submit campaign to start it

6: Contacts
===========
info@ictinnovations.com
http://www.ictinnovations.com
