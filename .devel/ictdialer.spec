%define dialer_version __DIALER_VERSION__
%define dialer_edition __DIALER_EDITION__
%define dialer_build   __DIALER_BUILD__
%define dialer_home    %{_prefix}/ictdialer

Name:    ictdialer
Version: %{dialer_version}.%{dialer_build}
Release: %{dialer_edition}%{?dist}
Summary: Web based management interface for ICTDialer

Vendor:   ICT Innovations
Group:    ict
Packager: Nasir Iqbal <nasir@ictinnovations.com> 
License:  MPLv2
URL:      https://ictdialer.org/

Source0:  %{name}-%{version}.tar.gz
Source1:  ictdialer.conf

BuildArch: noarch
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
BuildRequires: npm git

Provides: ictdialer

# GUI dependence on ICTDialer
Requires: ictcore-voice ictcore-fax ictcore-email ictcore-sms
# ICTDialer exposse its interface via apache web server
Requires: httpd

%description
ICTDialer is web based interface which act as client to ICTCore REST APIs and expose Voice, Fax, SMS and Email related services over web

%prep
%setup -q -n %{name}-%{version}

%build
npm install @angular/cli
npm install
./node_modules/.bin/ng build --prod

%install
%{__rm} -rf %{buildroot}
%{__install} -d %{buildroot}%{dialer_home}
%{__cp} -pr dist/* %{buildroot}%{dialer_home}
# install ictdialer configuration for apache
%{__mkdir} -p %{buildroot}/etc/httpd/conf.d/
%{__cp} %SOURCE1 %{buildroot}/etc/httpd/conf.d/ictdialer.conf

%clean
%{__rm} -rf %{buildroot}

%files
# basic configuration files
%defattr(644,root,root,755)
%config /etc/httpd/conf.d/ictdialer.conf

# include all ictdialer files and folder
%defattr(644,apache,apache,755)
%{dialer_home}

%post
# alter firewall for sip
%if %{rhel} < 7
# apache web port
/sbin/iptables -I INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT    # tcp
/etc/init.d/iptables save
%else
# apache web port
/bin/firewall-cmd --zone=public --add-port=80/tcp --permanent  # tcp
/bin/firewall-cmd --reload
%endif

%changelog
* Tue Jan 16 2018 Nasir Iqbal <nasir@ictinnovations.com> - 3.0.0
- ICTDialer 3.0.0 release with Angular instead of Drupal 

* Thu Nov 20 2018 Nasir Iqbal <nasir@ictinnovations.com> - 0.2.0
- ICTDialer GUI 0.2.0 release

* Thu Dec 28 2017 Nasir Iqbal <nasir@ictinnovations.com> - 0.1.0
- ICTCore GUI 0.1.0 release (first release)
