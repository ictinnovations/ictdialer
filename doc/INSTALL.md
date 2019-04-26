### ICTCORE - INSTALLATION GUIDE (CENTOS / FEDORA)
**INSTALLATION INSTRUCTIONS** 
ICTDIALER is a unique and complete faxing solution featuring Mass Voice, Sms, Email and fax broadcasting campaigns, and Transmissions.

### 2. INSTALL BASIC SYSTEM REQUIREMENTS

* CentOs 6
* Apache 2
* MySQL 5
* PHP 5.3.3
* ICTCore
* Sendmail
* FreeSWITCH
To install above requirements, first of all we need to install their respective repositories

 **FOR CENTOS 7** 
         
         rpm -Uvh 'https://service.ictinnovations.com/repo/7/ict-release-7-4.el7.centos.noarch.rpm'  
         rpm -Uvh 'http://files.freeswitch.org/freeswitch-release-1-0.noarch.rpm'  
         yum install epel-release 
         yum INSTALL ictdialer

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

### 3. ICTCORE INSTALLATION
ICTCore is main dependency of ICTDialer, if you have proper repositories pre installed (see above) then all other dependencies will be installed along with ICTCore. so we just need to issue following command:

         yum -y install ictcore ictcore-voice ictcore-fax ictcore-sms

**SETUP ICTCORE DATABASE**

write in command prtompt
          mysql
enter these commands one by one:
 
         CREATE DATABASE ictdialer;
         USE ictdialer;
         GRANT ALL PRIVILEGES ON ictdialer.* TO ictdialeruser@localhost IDENTIFIED BY 'plsChangeIt';
         FLUSH PRIVILEGES;
         SOURCE /usr/ictcore/db/database.sql;
         SOURCE /usr/ictcore/db/voice.sql;
         SOURCE /usr/ictcore/db/fax.sql;
         SOURCE /usr/ictcore/db/sms.sql;
         SOURCE /usr/ictcore/db/email.sql;

Now update /usr/ictcore/etc/ictcore.conf and /usr/ictcore/etc/odbc.ini files as per above created database.For that exit from database with 
        exit
go to usr folder to edit ictcore.conf and odbc.ini. Once you're in etc write
        vi ictcore.conf
edit your username and password here by writing 
        i
press escape and enter following to save the data
        :w 
press escape and write: 
        :q 
edit odbc.ini as in the same way.


Now go to `http://yourdomain/ictdialer`
Login by entering the default admin and password, which we provided you.Go to the admininstration pannel , which is placed on the bottom of the side bar on left.Create a new user or edit the exisiting.
You can configure providers and accounts too.For further details visit [Admin Guide]()

