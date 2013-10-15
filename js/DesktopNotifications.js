Ext.namespace('Zarafa.plugins.desktopnotifications.js');

/**
 * @class Zarafa.plugins.desktopnotifications.js.DesktopNotification
 * @singleton
 *
 * Singleton class to provide a wrapper for HTML5 desktop notifications feature
 */
Zarafa.plugins.desktopnotifications.js.DesktopNotification = (function() {
	var notificationAPI = window.webkitNotifications || window.Notification;
	var PERMISSION = ['granted', 'default', 'denied'];

	return {
		/**
		 * Check if browser supports notifications API
		 * @return {Boolean} true if browser supports desktop notifications else false
		 */
		supports : function()
		{
			if(notificationAPI) {
				return true;
			}

			return false;
		},

		/**
		 * Check if browser has permissions to show notifications
		 * @return {Boolean} true if permissions are granted to show desktop notifications else false
		 */
		hasPermission : function()
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			var permission = 'default';
			if(Ext.isFunction(notificationAPI.checkPermission)) {
				permission = PERMISSION[notificationAPI.checkPermission()];
			} else if (Ext.isFunction(notificationAPI.permissionLevel)) {
				permission = notificationAPI.permissionLevel();
			} else if (notificationAPI.permission) {
				permission = notificationAPI.permission;
			}

			if(permission === 'granted') {
				return true;
			}

			return false;
		},

		/**
		 * Ask for permissions to show notifications
		 * In chrome this function will only work when you call it based on some user action
		 * like click of a button
		 * @param {Function} callback callback function that will be called after user has
		 * granted/rejected permission request
		 */
		authorize : function(callback)
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;

			if (Ext.isFunction(notificationAPI.requestPermission)) {
				notificationAPI.requestPermission(callback);
			}
		},

		/**
		 * Function will show a desktop notification
		 * @param {String} title title to use when showing desktop notifications
		 * @param {Object} options object containing below key value pairs to provide extra information
		 * for the desktop notifications
		 * 		- icon : icon to show in desktop notifications
		 * 		- body : message to display
		 *		- tag : tag to group same type of notifications so multiple notifications
		 *				will not be showed multiple times
		 */
		notify : function(title, options)
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			if(!this.hasPermission()) {
				alert('Permission is denied to show desktop notifications');
			}

			var notification;
// autoclose, handlers
			if(Ext.isFunction(notificationAPI.createNotification)) {
				notification = notificationAPI.createNotification(options.icon, title, options.body);
				notification.show();
			} else {
				notification = new notificationAPI(title, {
					icon : options.icon,
					body : options.body,
					tag : options.tag
				});
			}
		}
	};
})();
