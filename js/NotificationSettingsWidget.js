Ext.namespace('Zarafa.plugins.desktop_notifications.js');

/**
 * @class Zarafa.plugins.desktop_notifications.js.NotificationSettingsWidget
 * @extends Zarafa.settings.ui.SettingsWidget
 * @xtype zarafa.notificationsettingswidget
 *
 * The {@link Zarafa.settings.ui.SettingsWidget widget} for
 * configuring the settings of the plugin
 */
Zarafa.plugins.desktop_notifications.js.NotificationSettingsWidget = Ext.extend(Zarafa.settings.ui.SettingsWidget, {

	/**
	 * @cfg {Zarafa.plugins.desktop_notifications.js.DesktopNotificationsPlugin} plugin The plugin which has registered this
	 * settings widget.
	 */
	plugin : undefined,

	/**
	 * Settings model instance which will be used to get current settings
	 * @property
	 * @type Zarafa.settings.SettingsModel
	 */
	model : undefined,

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			title : _('Desktop Notifications Settings Plugin'),
			xtype: 'panel',
			height : 125,
			layout : {
				type : 'vbox',
				align : 'left',
				pack  : 'start'
			},
			items : this.createPanelItems()
		});

		Zarafa.plugins.desktop_notifications.js.NotificationSettingsWidget.superclass.constructor.call(this, config);
	},

	/**
	 * Function will return object which will be used to create items for this settings widget
	 * @return {Array} Array containing configuration objects of child items
	 */
	createPanelItems : function()
	{
		return [{
			xtype : 'displayfield',
			value : _('For enabling desktop notifications we need permissions from browser.'),
			fieldClass : 'x-form-display-field zarafa-settings-widget-extrainfo'
		}, {
			xtype : 'button',
			text : _('Request Permissions'),
			handler : this.requestPermission,
			scope : this,
			ref : 'requestPermissionBtn'
		}];
	},

	/**
	 * Function will be used to get permission from user to show desktop notifications
	 * @FIXME move code of changing setting to some other part
	 */
	requestPermission : function()
	{
		Zarafa.plugins.desktop_notifications.js.DesktopNotification.authorize(function(perm) {
			// chrome doesn't give us current permission level, so default to granted if permission level is passed
			var permission = 'granted';
			if(perm) {
				permission = perm;
			}

			if(permission === 'granted') {
				// update ui
				this.update(this.model);

				// update settings for new mail notification
				container.getSettingsModel().set('zarafa/v1/main/notifier/info/newmail/value', 'desktopnotifier');
			}
		}.createDelegate(this));
	},

	/**
	 * Update the view with the new values of the settings
	 * model. Called when opening the settings widget or when a new
	 * folder is selected.
	 *
	 * @param {Zarafa.settings.SettingsModel} settingsModel The settings to display.
	 */
	update : function(settingsModel)
	{
		this.model = settingsModel;

		var disabled = false;
		if(Zarafa.plugins.desktop_notifications.js.DesktopNotification.hasPermission()) {
			disabled = true;
		}

		this.requestPermissionBtn.setDisabled(disabled);
	}
});

Ext.reg('zarafa.notificationsettingswidget', Zarafa.plugins.desktop_notifications.js.NotificationSettingsWidget);
