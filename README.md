Introduction
============
**ICTDialer** is an open-source, multi-user auto dialer software designed for voice broadcasting and fax broadcasting. It supports both inbound and outbound communications using advanced telephony protocols such as T.38, G.711 pass-through, and SIP-based VoIP communication. **ICTDialer** is built on top of renowned open-source technologies, including **FreeSWITCH**, **ICTCore** communications **framework**, and a PHP-based Angular framework.

**ICTDialer** can be used in following faxing scenarios

* Voice Broadcasting
* [Email to fax][emailtofax] / [web to fax][webtofax] / [fax to email][emailtofax]
* ATA support supporting both sending and recieving Fax over Fax machines using ATA. 
* G.711 based Fax Origination / Termination / Gateway
* T.38 based Fax Origination / Termination
* PSTN/SS7 based Fax Origination / Termination

A Single GUI is created to cover all the major communication methods and services like:

- Voice Broadcasting Campaigns
- Send Document with multiple files (optional)
- Fax to Email
- Extension Support
- DIDs

### Features

By Using ICTDialer a user can manage:

  * Voice Messages
  * Outbound Fax
  * Inbound Fax
  * Fax DIDs
  * Fax Extensions
  * Contacts Management
  * Fax Documents
  * User Management
  * Provider / Trunks

Quick start with Docker
=======================

The image bundles Apache, PHP, FreeSWITCH, MariaDB and this dashboard, so there
is nothing else to install.

```
docker run -d --name ictdialer \
  -p 8080:80 \
  -p 5060:5060/tcp -p 5060:5060/udp \
  -p 16384-16484:16384-16484/udp \
  ictinnovations/ictdialer:latest
```

Give it about two minutes on first boot while the database is created and the
schema loads, then open `http://localhost:8080/`. Sign in with
`admin@ictcore.org` / `helloAdmin` and change that password straight away.
Publish the RTP range as shown or your calls will connect and play silence.

For an external database, volumes and build instructions see
[docker/README.md](docker/README.md).

Credits
=======
ICTDialer is developed by [ICT Innovations][developer]
ICTDialer developed over [ictcore] , a open source freeswitch based framework for developers 

[official]: https://ictfax.org/ "ICTFAX Open Source Online FAX & Email to FAX Solution"
[gpl3]: https://www.gnu.org/licenses/gpl-3.0.html "GNU GPL V.3 License"
[install]: https://ictfax.org/content/ictfax-installation-guide "ICTFAX Installation Guide"
[admin]: https://www.ictfax.org/content/ictfax-admin-guide "ICTFAX Administration Guide"
[user]: https://www.ictfax.org/content/ictfax-user-guide "ICTFAX User Guide"
[emailtofax]: https://ictfax.org/fax-services-email-to-fax-software-fax-to-email-server "Email to fax, Fax to Email"
[webtofax]: https://ictfax.org/online-fax-services-web-to-fax-software "Online Fax, Web to fax"
[forum]: https://forum.ictfax.org/ "ICTFAX Discussion Forum"
[demo]: https://demo.ictfax.org/ "ICTFAX Demo"
[developer]: https://www.ictinnovations.com/ "ICT Innovations's official website"
[ICTCore]: https://www.ictcore.org/ "ICTCore Communications framework"
[ictcore]: https://github.com/ictinnovations/ictcore/  "communications framework for web developers"
[fax server software]: https://www.ictfax.org/ "Fax Server Software"
