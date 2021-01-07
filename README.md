Management GUI for ICTDialer
============================

ICTDialer is a unified communication auto dialer sofrware for mass communications like voice broadcasting, fax broadcasting, sms and email marketing 

ICTDialer front end has been developed over Angular framwork and at back end, ICTCore has been employed, A Freeswitch based unified communications framework that empower ICTDialer with communciations capabilities like creating different kind of transmissions like SMS, emails and voice fax calls.

Here a brief instruction and user guide for this application.

### Unified Communication

A Single GUI is created to cover all the major communication methods and services like:
- Send SMS
- Send Document
- Send Email
- Voice Call

### Features

By Using ICTDialer a user can manage:

* Contacts Management
* Message Management
  * SMS Messages
  * Fax Documents
  * Voice Recording
  * Email Templates
* Transmission Management

Getting Started
---------------
### Download and install

To download the ICTDialer you need to have a fresh server.

#### Install through RPM

You can install the ICTDialer through yum

        yum install ictdialer

#### Install from the source code

To install from the source code follow the build guide and prepare the build. For preparing the build follow the [Build Guide](doc/build-guide.md). After preparing the build place it in

      /usr/ictdialer/wwwroot/GUI

Now go to the http:ip_address/ictdialer/wwwroot/GUI/dist ,you will see the application running. 

### Configure Providers

You can configure Providers by using the provider management. In order to manage your providers click on the Provider management a list of providers will appear. Here you can manage all of your providers. You can also delete the provider by clicking on the delete icon against the provider in provider list.

In order to configure the new provider click the button on the top left page of provider list. It will redirect you to the **add provider** window. Enter the required fields like:

* User Name
* Password
* Host (IP Address)
* Port
* Gateway type(SIP for voice & Fax, SMTP for email and SMPP for SMS)
* Weight (provider having light weight will be used more frequently)
and so on.

A new provider will be configured and it will redirect you to the list.

You can **update** provider details by clicking on the edit icon against the provider name in the list.

You can also **delete** the provider by clicking on the delete icon against the provider in provider list.

### Sending your first message / call

To send your first message/call you firstly need to create the message/call. To create the message/call
* Go to the message management.
* Choose the type of message you want to send i.e SMS, Email, Fax, Voice Call.
* Create the message of your choice (For more details See Message Management below)
* After creating the message, Choose the desired transmission, i.e if you want to send the SMS click Send SMS in Transmission Management
* A new window will appear. Choose the message.
* Choose the Contact
* Enter additional remarks, if any.
* Press Submit button

### Signing In:

To start the application just go the link, A window will appear it will ask for the username and password. Fill the required fields and Sign in. It will show warning if the email is not valid and if password is not entered. Once entered the fields, Sign In. Now you can manage all of your contacts, texts, voice recording, send fax, send call and much more features.

After succesfully signing in it will redirect you to the transmission page

Contact Management
------------------

### Contacts:

In order to manage your contacts click on the phone icon a list of contacts will appear. Here you can manage all of your contacts. You can **update** contact details by clicking on the edit icon against the contact name in the list. You can also **delete** the contact by clicking on the delete icon against the contact in contact list.

In order to create the new contact click the button on the top left page of contact list. It will redirect you to the **add contact** window. Fill the required fields by entering the correct first name, last name, phone and email. Enter the correct phone number and password else it will show warning. Enter the required fields and press the submit button. A new contact will be created and it will redirect you to the list.

### Contact Group:

Groups are an efficient way of delivering message. For example Friends Group, Customer group etc. ICT Dialer also has a feature of contact group. In a case when you want to send sms, email, fax and voice to a group of people yopu can use this group service to send you message to a list of people. To create a group click on the Contact Management and then click the group. Here you can see the list of a group. To create a group click on the **Add Group** button on the top left page of group list. You can also delete the group by clicking on the delete icon against the group in the group list.


Message Management
------------------
#### SMS Management

To manage the SMS click on the Message Management, click sms management it will show you the list of text SMS. You can **update** Text details by clicking on the edit icon against the text sms name in the list. You can also **delete** the Text SMS by clicking on the delete icon against the Text in Text list.

In order to create the new text sms click the button on the top left page of text list. It will redirect you to **add text** window. Fill the required fields like text name, text message and any additional description and click the submit button. A new SMS Text message will be created.


#### Voice Recording Management

To manage the Voice Recording click on the Message Management, click Voice Recording it will show you the list of Voice Recordings. You can **update** Recording details by clicking on the edit icon against the recording name in the list. You can also **delete** the Voice Recording by clicking on the delete icon against the Recording in Recording list.

In order to add the new voice recording click the button on the top left page of recording list. It will redirect you to **add recording** window. Fill the required fields like recording name, upload recording and any additional description and click the submit button. A new Voice Recording will be created.

In order to **Download** the recording click the download icon against the recording in the recording list.
Download of wav file/recording will be started.


#### Email Template Management

To manage the Emails click on the Message Management, click Email Template it will show you the list of Templates. You can **update** email template details by clicking on the edit icon against the template name in the list. You can also **delete** the email template by clicking on the delete icon against the email in email list.

In order to add the new email click the button on the top left page of recording list. It will redirect you to **add template** window. Fill the required fields like template name, upload HTML file and any additional description and click the submit button. A new Template will be created.

In order to **Download** the attachment click the download icon against the template in the template list. Download of HTML file/attachment will be started.


#### Fax Document Management

To manage the Fax Document click on the Message Management, click Fax Document it will show you the list of documents. You can **update** documents details by clicking on the edit icon against the document name in the list. You can also **delete** the document by clicking on the delete icon against the document name in document list.

In order to add the new fax document click the button on the top left page of document list. It will redirect you to **add document** window. Fill the required fields like document name, upload pdf file and any additional description and click the submit button. A new Document will be created.

In order to **Download** the document click the download icon against the document in the document list. Download of pdf file/document will be started.

Transmissions Management
------------------------
Here you can manage your transmission, It will ahow you the Transmission list. Moreover you can also create transmissions like send sms, send fax, send email and voice call.

In order to create your own transmission click the respective button. For example in order to create the new transmission for send fax click the **Send Fax** button. A Send Fax program window will open:
* Choose the document to be sent
* Select Contact to be sent
* Add Remarks where applicable
* Click the submit button
The send fax transmission will be created successfully. You can view the transmission in Transmission list and can also check its status.

Similarly you can create othe transmissions like send email, voice call like this.

Campaign Management:
-------------------

In case when you want to send a message to a group of contacts, you can use campaign management. ICTDialer supports different kind of campaigns like:

* SMS Campaign
* Email Campaign
* Voice Campaign
* Fax Campaign

Now you can send the message to a contact group instead of manually sending to each contact. Furthermore you can also schedule as when the campaign shoud start. You can **start** the campaign by hitting the start icon aginst the respective campaign in campaign list. You can also **stop** the campaign by hitting the stop icon against the campaign in the campaign list. You can schedule it according to your own desire and you can also cancel the schedule.

###### Create SMS Campaign:
 
In order to create the SMS Campaign, click on the SMS Campaign, it will redirect you to the Create SMS Campaign window. Now choose the SMS you want to send from a list of text, select the contact group, delay b/w calls in (millisecond), number of retires and hit the **Submit** button. An SMS Campaign will be created.

###### Create Voice Campaign:
 
In order to create the Voice Campaign, click on the Voice Campaign, it will redirect you to the Create Voice Campaign window. Now choose the Voice you want to send from a list of recordings, select the contact group, delay b/w calls in (millisecond), number of retires and hit the **Submit** button. A Voice Campaign will be created.

###### Create Email Campaign:
 
In order to create the Email Campaign, click on the Email Campaign, it will redirect you to the Create Email Campaign window. Now choose the Email you want to send from a list of templates, select the contact group, delay b/w calls in (millisecond), number of retires and hit the **Submit** button. A new Email Campaign will be created.

###### Create Fax Campaign:
 
In order to create the Fax Campaign, click on the Fax Campaign, it will redirect you to the Create Fax Campaign window. Now choose the Fax you want to send from a list of documents, select the contact group, delay b/w calls in (millisecond), number of retires and hit the **Submit** button. A new Fax Campaign will be created.

You can also **update** the campaign details by clicking on the edit icon against the respective campaign in the campaign list. The contact group once selected cannot be changed. You can change the message(voice, fax, sms and email) in the Edit mode. Once Edited press the update button. Now the campaign will be updated.

To **delete** a campaign click the delete icon against the respective campaign in the campaign list. 

User Management:
----------------

To manage the user click on the User Management, a list of user will appear. You can update the user details by clicking on the edit button against the user name in the list.

You can also **delete** the user by clicking on the delete icon against the user in the user list. In order to create the new user click the button on the top left page of user list. It will redirect you to the **Add User** window. Fill the required fields like username, password, first name, last name, so on and hit the Submit button.
A new user will be created.

You can also **update** the user detail by clicking on the edit icon against the user in the user list. Change the desired fields and press the update button.
