Task list for ICTDialer
=======================

Following are our recommendations and task list to improve overall user experience with ICTDialer.

First some general GUI related tasks

Tables
------
- Right align operations
- Left align all strings include phone and email
- Right align all numbers
- Pagination not working
- Scroll bars not working
- Operation icons can be improved further

Forms
-----
- Top heading is too big
- Some control does not match theme like **file control**
- When asking for **yes/no** use radio buttons
- Use search enable dropdown boxes whenever needed
- Only text is clickable in buttons, should be entire button.

Menus
-----
Use following order for menus

* Dashboard  
**Features**  
* Campaigns
* Contacts
  * Groups
  * Contacts
* Media
  * Voice recordings
  * Fax Documents
  * Email Templates
  * Text Messages
* Transmissions  
**Administration**  
* Provider / Trunks
* User Management

Layout
------
- Search not working
- Bell and Email icons at top have no use
- There is no profile page for user icon
- Developed by Fiza Khan, Copyright ICT Innovations 2018, all right reserved
- Remember me, at login screen, is it working
- Remove **Support Us** from menu top

Error handling
--------------
- Update application user in case API server return error.

ICTDialer / API
---------------
### Dashboard
- Show system statistics, like
  - Total campaign
  - Active campaign
  - Total contacts
  - Contact processed
- Link to **Start a broadcasting campaign**
- Link to **Send a single transmission**

### Contacts
- (in form) Put phone and email on same line
- (in form) Address on full line

### Groups
- (in list) Show contact count
- (in list) Authentication issue, with download sample
- (in form) File control does not match with theme

### Texts
- (in list) Show text length or use segments

### Templates
- (in list) show an icon if template have attachment.
- (in form) Subject, Message and Plain message will use full page length and will be placed together

### Recording
- (in list) Show recording length in seconds
- (in list) Show controls to play / pause recordings

### Documents
- (in list) Online preview

### Transmissions
- (in form) Add title field and move remarks to top along with title field.
- (in form) Add number of retries along with contact selection
- (in list) Show title
- (in list) Show program type

### Providers
- (in list) Show gateway type
- (in form) Rename **Username and Password** with **Access Credentials**
- (in form) Move active at top along with provider anme

### User management
- (in list) (in form) No space in Username
- (in list) Show both first and last names
- (in form) Repeat password for confirmation

### Campaigns
- (in list) Show status
- (in list) Show campaign progress using contact_total and contact_done fields
- (in form) Use proper dropdown select control for retry selection
- (in form) For users use second as delay unit

