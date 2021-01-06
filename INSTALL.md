### ICTDIALER - INSTALLATION GUIDE (CENTOS / FEDORA)
**INSTALLATION INSTRUCTIONS**   

ICTDIALER is a unique and complete solution featuring Mass, Voice, Sms, Email and fax broadcasting campaigns, and Transmissions.

### 1. INSTALL BASIC SYSTEM REQUIREMENTS

* CentOs 6
* Apache 2
* MySQL 5
* PHP 5.3.3
* ICTCore
* Sendmail
* FreeSWITCH
To install above requirements, first of all we need to install their respective repositories

**FOR CENTOS 7** 
         
          yum install -y https://service.ictinnovations.com/repo/7/ict-release-7-4.el7.centos.noarch.rpm  
          yum install -y http://files.freeswitch.org/freeswitch-release-1-6.noarch.rpm  
          yum install -y epel-release 
         

**FOR CENTOS 6**

        rpm -Uvh 'http://service.ictinnovations.com/repo/6/ict-release-6-2.noarch.rpm'            
        rpm -Uvh 'http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm'       
        rpm -Uvh 'http://files.freeswitch.org/freeswitch-release-1-0.noarch.rpm'                  

Disable SELinux, before proceeding further,
Check the SELinux state by:

             getenforce 
or  
         
            setenforce 0

If the output is either permissive or disabled, skip this task and follow the instructions given below, otherwise disable it first and then follow the instructions:

### 2. ICTCORE INSTALLATION
ICTCore is main dependency of ICTDialer, if you have proper repositories pre installed (see above) then all other dependencies will be installed along with ICTCore. We just need to issue following command:

         yum -y install ictcore ictcore-voice ictcore-fax ictcore-sms ictcore-email  


**SETUP ICTCORE DATABASE**

write in command prtompt
            mysql
enter these commands one by one:
 
         CREATE DATABASE ictdialer;
         USE ictdialer;
         GRANT ALL PRIVILEGES ON ictdialer. *TO ictdialeruser@localhost IDENTIFIED BY 'plsChangeIt';                  
         FLUSH PRIVILEGES;
         SOURCE /usr/ictcore/db/database.sql;
         SOURCE /usr/ictcore/db/voice.sql;
         SOURCE /usr/ictcore/db/fax.sql;
         SOURCE /usr/ictcore/db/sms.sql;
         SOURCE /usr/ictcore/db/email.sql;
         SOURCE /usr/ictcore/db/data/role_user.sql;
         SOURCE /usr/ictcore/db/data/role_admin.sql;
         SOURCE /usr/ictcore/db/data/demo_users.sql;
  
  
Now update `/usr/ictcore/etc/ictcore.conf` and `/usr/ictcore/etc/odbc.ini` files as per above created database.

Open the file ictcore.conf and find out the [db] section and replace the following lines:

user = myuser

pass = mypass

name = ictcore

with these lines:

user = ictdialeruser

pass = plsChangeIt

name = ictdialer

Next open the file odbc.ini and change the following lines

Database = ictcore

User     = myuser

Password = mypass

with these lines

Database = ictdialer

User     = ictdialeruser

Password = plsChangeIt

### 3. ICTDIALR INSTALATION 

Now install ICTDialer web interface

         yum install ictdialer
         
Now Restart the **apache** by typing the following command in the terminal

        service httpd restart

  
Now visit `http://yourdomain/ictdialer` in your browser 

Default Username : **admin@ictcore.org**  
Default Password : **helloAdmin**  

Login by entering the default admin and password, which we provided you. Go to the administration panel, which is placed on the bottom of the side bar on left.Create a new user or edit the existing.
You can configure providers and accounts too. For further details visit [**Admin guide** ](doc/admin-guide.md).  

