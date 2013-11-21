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
			icon : 'data:image/vnd.microsoft.icon;base64,AAABAAMAEBAQAAEABAAoAQAANgAAACAgEAABAAQA6AIAAF4BAAAwMBAAAQAEAGgGAABGBAAAKAAAABAAAAAgAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJQtAACYNRgAm0AiAKNOMgCqWz8AsmpTALh6agC/hHAAxY5+AM2ikwDVraIA4MG2AOPNxgDw4d0A/P/9AAAAAADwAAEAAAAAD/BiEAru7u4P8IAANp7u7g/xwgKjG+7uD/A7jKAD7u4P8BkyowWe7g/wCCA5VhnuD/AXMAjCAt4P8JZAKaAAng/w7meG0gOmD/Du5QHJSTEP8O7tYYa8IA/w7u7rRTSBD/Du7u6oMVz/8O7u7u0xLf/wAAAAAACv/4ABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAwAAgAMAAIAHAAAoAAAAIAAAAEAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlC0AAJY1FgCdQiUAo041AKtcQQCybFcAwol2AMqbjQDSqZwA2LSqAN/CtwDo08wA7t/cAPTr6gD8//0AAAAAAP9jIopCEQEAAAAAAAAAAP//MBVyAQAC3t7u7u7u7uD//yErIAAAAV7u7u7u7u7g//8wOAEBARBd7u7u7u7u4P//MDYBAAABc57u7u7u7uD//zE1AAEBBMIq7e7u7u7g//8ilxABASxAAr7u7u7u4P//e7whEAO3EBA+7u7u7uD//6IUpDNd5BAAFu7u7u7g//9BAX7dzeYAEALO7u7u4P//MAFdIhK9IAEU3e7u7uD//zEAPSEBLVAQXUXt7u7g//8BAD0gAATTA+QRju7u4P//EAEsIAEBaitgACzu7uD//xEAKyABACzLIBAD7u7g//8HICwhAAEZ5wEBAY7u4P//DpIcMAEALeUBAAFO7uD//w7rK0EAE47kEAAATu7g//8O7t1AJaus5RAAEJpM4P//Du7uhsYyEswgAQTjEtH//w7u7u5QABBuggE9YQBA//8O7u7uowEBjrxEqyAAIP//Du7u7uswALQ97uYBAQD//w7u7u7uxAOiCVXLIAAA//8O7u7u7u5YUAcwKZIAKP//Du7u7u7u7jAXMBKXEp///w7u7u7u7u6CCDAAKmr///8O7u7u7u7u6kwwEALP////Du7u7u7u7u7oEAAAX////w7u7u7u7u7u7lEQFM////8O7u7u7u7u7u7mID//////AAAAAAAAAAAAAACP////wAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAPAAAADwAAAA8AAAAfAAAAPwAAAH8AAAB/AAAAfwAAAf8AAAH8oAAAAMAAAAGAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlC0AAJY0FQCYOhgAnD8nAKJMMgCqWkAAtG1WAMCHdQDOoZIA3r+1AOfRyQDs3dkA9OvrAP/8+AD8//4AAAAAAP/7QRIVy3MQESIyIzMzMzMzMzMzMyav///1EBA7gxEBABGe7u7u7u7u7u7u7ulf///yABKpEAAAABA57t3u7u7u7u7u7u4////xAQPkEREAAQAT7e7u7u7u7u7u7u4////xABeCAAAAAAAS7e7d7u7u7u7u7u4////yERhwAAABEQAB6e3u7u7u7u7u7u4////xABlRARAQAAEVsZ7u7u7u7u7u7u4////yACoxAAABAQAagSrs7u7u7u7u7u4////yADtAAQAQAAF+QAK+7d7u7u7u7u4////yEU5RAAAQARXoEQEr7u7u7u7u7u4////xN75wAAEAATyyEAAT7t7u7u7u7u4////5yIzDERAQEr5AAAECjO7u7u7u7u4////+URKJQyMSa+wgEBAQLO7e7u7u7u4////6IAAq6Zqb7OsgABAABe3u7u7u7u4////2AAEV7su5m94xAAABEp7t3u7u7u4////1AQAC6xIiEr6BEBAQE77u7u7u7u4////zAQESuSABATzjAAECXMa+7u7u7u4////xEAACmREAEBbpIBAW6iFezu7u7u4////xEBABiBEAAAGOYQE8oQEY7t3u7u4////xAAEBiRAAEBAp0xGrIQACru7u7u4////xAQABeSEBAAAR2hXmEBARTu3u7u4////zEBABaiAAEBABfouhAAEAF+7e7u4////zggABayEAAAAQPs6AEBAAAa3e7u4////z2CEQXRAQEQAQHu5gAQAAEE7t7u4////z7qIAXhEAEAEAXe5AEAAQECrt7e4////z7usxTjEAABABru4QAAAQEDnu3t4////z7u7FPlAAERFZ7ushAQEAACzu7u4////z7u7tjnABJYzuzt4QABAQEW6mnt4////z7u7u7oAnzqhCJ+5wAQAAAawRKO4////z7u7u7si+kyAAAo6yAAAQF+YQAq4////z7u7u7u7nEAEQAF7qIQAQPLIQEE4////z7u7u7u7nIBABAU7ukyEDvlEBACc////z7u7u7u7tcRAAAU7I7nRr5yAAABI////z7u7u7u7u6CAAEH4yfs7e4gAQAQAf///z7u7u7u7u7pIQEacQLsru5AEAEQA////z7u7u7u7u7uoxBOIALkI52zAAEABP///z7u7u7u7u7u7EGYIBLBACfqERAAKv///z7u7u7u7u7u7tvkAAOyAQFukQADn////z7u7u7u7u7u7u7hAAKUAQAm6DAq/////z7u7u7u7u7u7u7pMQOmAAEBbmO//////z7u7u7u7u7u7u7uowLGAQABF9zv/////z7u7u7u7u7u7u7u62mzAAEAAp///////z7u7u7u7u7u7u7u7u5hAAEAAR///////z3u7u7u7u7u7u7u7u6xAQABAV///////z3u7u7u7u7u7u7u7u7pIAEAGP///////y7e7u7u7u7u7u7u7u7dtBARj////////2ne7u7u7u7u7u7u7u7u7VIB/////////6YzMzMzMzMzMzMzMzMzMzEZ///////+AAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAHAADgAAAAAAcAAOAAAAAABwAA4AAAAAAPAADgAAAAAB8AAOAAAAAAPwAA4AAAAAA/AADgAAAAAP8AAOAAAAAA/wAA4AAAAAD/AADgAAAAAf8AAOAAAAAD/wAA4AAAAAf/AADgAAAAB/8AAA=='
		}, {
			click : function() {
				// focus window which generated this notification
				window.focus();

				// cancel notification
				this.cancel();
			}
		});

		Zarafa.plugins.desktopnotifications.js.DesktopNotifier.superclass.notify.apply(this, arguments);
	}
});

Zarafa.onReady(function() {
	container.getNotifier().registerPlugin('desktopnotifier', new Zarafa.plugins.desktopnotifications.js.DesktopNotifier());
});
