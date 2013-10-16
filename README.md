zarafa-webapp-notifications
===========================

Plugin to enable desktop notifications for webapp

Have only been checked in latest versions of chrome and firefox in windows os

There are also some differences how notifications work in chrome and firefox so you will find some behavioural difference between these two browsers

How to enable
=============
1. Go to settings section
2. Go to Plugins tab
3. Enable desktop notifications plugin and reload webapp
4. Go to plugins tab of settings section
5. Click on request permission button
6. Click allow in popup that is shown by browser
7. bingo! you are ready to use cool desktop notifications

How to disable
==============
1. If you ever intend not to use this plugin then perform below steps to restore normal process
2. Disable plugin from plugins tab of settings section
3. Revoke permissions from browser for showing desktop notifications (check with google)
4. Restore setting for new mail notification
	1. Go to settings section
	2. Go to advanced tab (contact your administrator if you are not seeing it)
	3. Change setting 'zarafa/v1/main/notifier/info/newmail/value' to 'popup'

Notes
=====
- Currently only new mail notification is supported
- Feedback/Bug Reports are welcome
