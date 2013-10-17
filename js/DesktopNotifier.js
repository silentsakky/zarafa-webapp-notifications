Ext.namespace('Zarafa.plugins.desktopnotifications.js');

/**
 * @class Zarafa.plugins.desktopnotifications.js.DesktopNotifier
 * @extends Zarafa.core.ui.notifier.NotifyPlugin
 *
 * A plugin for notification plugin to show desktop notifications instead of normal in browser
 * notifications for actions like new mail, reminder etc.
 */
Zarafa.plugins.desktopnotifications.js.DesktopNotifier = Ext.extend(Zarafa.core.ui.notifier.NotifyPlugin, {
	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Zarafa.plugins.desktopnotifications.js.DesktopNotifier.superclass.constructor.call(this, config);
	},

	/**
	 * Notify the user with a message.
	 *
	 * The category can be either  "error", "warning", "info" or "debug", or a subtype thereof (e.g. "info.newmail").
	 *
	 * @param {String} category The category which applies to the notification.
	 * @param {String} title The title which must be shown in the message.
	 * @param {String} message The message which should be displayed.
	 * @param {Object} config Configuration object which can be applied to the notifier
	 * This object can contain keys like:
	 * - autoclose: Auto close notification after sometime
	 * @return {Mixed} A reference to the message which was created, this can be used
	 * as value for 'reference' in the config argument.
	 */
	notify : function(category, title, message, config)
	{
		Zarafa.plugins.desktopnotifications.js.DesktopNotification.notify(title, {
			tag : category,
			body : message,
			icon : 'data:image/png;base64,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'
		});

		Zarafa.plugins.desktopnotifications.js.DesktopNotifier.superclass.notify.apply(this, arguments);
	}
});

Zarafa.onReady(function() {
	container.getNotifier().registerPlugin('desktopnotifier', new Zarafa.plugins.desktopnotifications.js.DesktopNotifier());
});
