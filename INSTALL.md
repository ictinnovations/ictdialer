### ICTDialer - INSTALLATION GUIDE (CENTOS / FEDORA)
**INSTALLATION INSTRUCTIONS**   

ictdialer is a unique and complete solution featuring Mass, Voice, Sms, Email and fax broadcasting campaigns, and Transmissions.

- Install the MariaDB 10.11 

Create mariadb 10.11 repo. Add the following code into this file `vi /etc/yum.repos.d/MariaDB.repo`

```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.11/rhel8-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

Install required dependencies

```
sudo dnf install perl-DBI boost-program-options socat -y
sudo dnf install boost boost-program-options -y
```
- Install the Perl module and its dependencies (For Rockylinux & Centos9)

```
sudo dnf install perl perl-CPAN -y
sudo cpan Sys::Hostname
```


Install the MariaDB

```
sudo dnf install MariaDB-server MariaDB-client --disablerepo='*' --enablerepo='mariadb' -y
```

- Install Remi-repo & Epel-repo

```
sudo dnf install epel-release -y
yum install dnf-utils http://rpms.remirepo.net/enterprise/remi-release-9.rpm
```

- enable the PHP Remi 8.3

```
sudo dnf module reset php -y
sudo dnf module enable php:remi-8.3 -y
```

- Install the Okey repository for FreeSWITCH (For Rockylinux & Centos9)

```
dnf config-manager --enable crb
wget http://repo.okay.com.mx/centos/9/x86_64/release/okay-release-1-10.el9.noarch.rpm
yum install okay-release-1-10.el9.noarch.rpm
dnf install task-freeswitch
```

- download ICTCore packages from our private repository/koji and install in on the server but please don't install ictcore-sms

```
yum install ictcore ictcore-fax ictcore-email ictcore-voice ictcore-freeswitch ictcore-sendmail
```

- Install nodejs 14,  nvm 6.x.x and angular 13.

```
sudo dnf install -y curl git gcc-c++ make

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

nvm install 14.21.3
nvm use 14.21.3
nvm alias default 14.21.3

npm install -g npm@6.14.18

npm install -g @angular/cli@13.3.11

node --version
npm --version
ng version
```

- download ictdialer source code from our github repository and follow below steps to compile

```
git clone https://github.com/ictinnovations/ictdialer.git /tmp/ictdialer
cd /tmp/ictdialer
npm install
ng build
rm -rf /usr/ictdialer
mv dist /usr/ictdialer
```

- Install FastCGI Process Manager 

```
yum install php php-fpm  php-gd php-mysqlnd
```

- configure the document root in apache  "/usr/ictdialer"

- uncomment "LoadModule mpm_prefork_module modules/mod_mpm_prefork.so" and comment this line "LoadModule mpm_event_module modules/mod_mpm_event.so" from this file /etc/httpd/conf.modules.d/00-mpm.conf 

- change PHP_ADMIN_VALUE open_basedir line into 

```
SetEnv PHP_ADMIN_VALUE "open_basedir = /usr/ictcore/:/usr/bin:/bin:/tmp/"
```

- install Imagic 

```
yum install -y ImageMagick ImageMagick-devel  
pecl install imagick  
echo "extension=imagick.so" > /etc/php.d/imagick.ini  
```

- install mcrypt 

```
yum install --enablerepo=epel php-devel php-pear libmcrypt libmcrypt-devel  

pecl install mcrypt  
echo 'extension=mcrypt.so' > /etc/php.d/mcrypt.ini 
```

- install imap 

```
yum install php-imap -y
```

- disable selinux

```
setenforce 0
```

- restart the apache service
- restart php-fpm service

```
service httpd restart
service php-fpm restart
```

- install the ictdialer database 

```
### Service Provider Branch

CREATE DATABASE ictdialer;
USE ictdialer;
GRANT ALL PRIVILEGES ON ictdialer.* TO ictdialeruser@localhost IDENTIFIED BY 'plsChangeIt';
FLUSH PRIVILEGES;

### Service Provider with 3-level-tenant

source /usr/ictcore/db/database.sql;
source /usr/ictcore/db/tenant.sql
source /usr/ictcore/db/billing.sql;
source /usr/ictcore/db/email.sql;
source /usr/ictcore/db/fax.sql;
source /usr/ictcore/db/sms.sql;
source /usr/ictcore/db/voice.sql;
source /usr/ictcore/db/contact_dnc.sql;
source /usr/ictcore/db/branding.sql;
source /usr/ictcore/db/data/role_user.sql;
source /usr/ictcore/db/data/role_admin.sql;
source /usr/ictcore/db/data/role_tenant.sql;
source /usr/ictcore/db/data/demo_users.sql;
source /usr/ictcore/db/routes_management/destination.sql;
source /usr/ictcore/db/routes_management/permissions.sql;

### Addioantiol Features 
source /usr/ictcore/db/login_attempts.sql
source /usr/ictcore/db/passwd_history.sql
source /usr/ictcore/db/password_policy.sql
source /usr/ictcore/db/update/update_retention.sql
```

for update 
```
source /usr/ictcore/db/update_user_level_upgrade/role_tenant.sql;
```

Open the file /etc/ictcore.conf and find out the [db] section and replace user, password and database name in the following lines:


```
user = ictdialeruser
pass = plsChangeIt
name = ictdialer
```

```
cd /usr/ictcore/bin/sendmail
./email_to_fax
```

- configure the email-2-fax and fax-2-service, following the guide "4. EMAIL TO FAX / FAX TO EMAIL SERVICE (OPTIONAL)"  from this link  https://ictdialer.org/content/ictdialer-installation-guide

```
echo "ictcore" >> /etc/mail/trusted-users
echo "apache" >> /etc/mail/trusted-users

echo "FAX_DOMAIN.COM" >> /etc/mail/local-host-names

echo '@FAX_DOMAIN.COM ictcore' >> /etc/mail/virtusertable

```

to apply email related changes

```
/etc/mail/make
```

restart sendmail service so changes can take affect

```
chkconfig sendmail on
service sendmail restart
```

- in case if document not uploading then install "libtiff-tools" package 

```
yum install libtiff-tools -y
```

- install aes library for encryption by `composer require phpseclib/phpseclib:~3.0` and `composer require spomky-labs/otphp endroid/qr-code`

- How to start and stop the FreeSWITCH


- run this command "freeswitch -nc" for background run

- delete pid of FreeSWITCH to stop the FreeSWITCH service

```
ps -A | grep freeswitch

19892 freeswitch

kill -9 19892
```

- enter into freeswitch

```
fs_cli
```

- enable sip debug

```
sofia global siptrace on
```

### Additional Configuration 
update listen_ip with 0.0.0.0 in /etc/freeswitch/autoload_configs/event_socket.conf.xml    [allowed_timeslot] => 
    [allowed_days] => 
  file

### restart freeswitch with service command
by-default freeswitch will not restart with `service freeswitch restart` command in cenots 8 / rocky linux 8. Therefore install the following codes for it 

```
cat <<EOF | sudo tee /etc/systemd/system/freeswitch.service
[Unit]
Description=freeswitch
Wants=network-online.target
Requires=network.target local-fs.target
After=network.target network-online.target local-fs.target

[Service]
; service
Type=forking
Environment="DAEMON_OPTS=-nonat"
EnvironmentFile=-/etc/default/freeswitch
ExecStart=/usr/bin/freeswitch -ncwait ${DAEMON_OPTS}
RestartSec=90
Restart=always
; exec
;User=root
;Group=daemon
LimitCORE=infinity
LimitNOFILE=100000
LimitNPROC=60000
LimitSTACK=250000
LimitRTPRIO=infinity
LimitRTTIME=infinity
IOSchedulingClass=realtime
IOSchedulingPriority=2
CPUSchedulingPolicy=rr
CPUSchedulingPriority=89
UMask=0007
NoNewPrivileges=false

[Install]
WantedBy=multi-user.target
EOF
```

```
sudo systemctl daemon-reload
sudo systemctl start freeswitch
sudo systemctl enable freeswitch
```


`pear install System_Daemon`
