Ext.namespace('Zarafa.plugins.desktopnotifications.js.settings');

/**
 * @class Zarafa.plugins.desktopnotifications.js.settings.NotificationSettingsWidget
 * @extends Zarafa.settings.ui.SettingsWidget
 * @xtype zarafa.notificationsettingswidget
 *
 * The {@link Zarafa.settings.ui.SettingsWidget widget} for
 * configuring the settings of the plugin
 */
Zarafa.plugins.desktopnotifications.js.settings.NotificationSettingsWidget = Ext.extend(Zarafa.settings.ui.SettingsWidget, {

	/**
	 * @cfg {Zarafa.plugins.desktopnotifications.js.DesktopNotificationsPlugin} plugin The plugin which has registered this
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

		Zarafa.plugins.desktopnotifications.js.settings.NotificationSettingsWidget.superclass.constructor.call(this, config);
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
		}, {
			xtype : 'button',
			text : _('Restore Settings'),
			handler : this.restoreSettings,
			scope : this,
			ref : 'restoreSettingsBtn'
		}];
	},

	/**
	 * Function will be used to get permission from user to show desktop notifications
	 * @FIXME move code of changing setting to some other part
	 */
	requestPermission : function()
	{
		Zarafa.plugins.desktopnotifications.js.DesktopNotification.authorize(function(perm) {
			if(perm === 'granted') {
				// update settings for new mail notification
				this.model.set('zarafa/v1/main/notifier/info/newmail/value', 'desktopnotifier');

				// update ui
				this.update(this.model);
			}
		}.createDelegate(this));
	},

	/**
	 * Function will be used to restore settings for new mail notifications, if user doesn't want
	 * to use this desktop notifications.
	 */
	restoreSettings : function()
	{
		// restore settings for new mail notification
		this.model.set('zarafa/v1/main/notifier/info/newmail/value', 'popup');

		// update ui
		this.update(this.model);
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

		var setting = this.model.get('zarafa/v1/main/notifier/info/newmail/value');

		var disabledPerm = false;
		if(Zarafa.plugins.desktopnotifications.js.DesktopNotification.hasPermission() && setting === 'desktopnotifier') {
			disabledPerm = true;
		}

		this.requestPermissionBtn.setDisabled(disabledPerm);

		var disableRestore = false;
		if(setting !== 'desktopnotifier') {
			disableRestore = true;
		}

		this.restoreSettingsBtn.setDisabled(disableRestore);
	}
});

Ext.reg('zarafa.notificationsettingswidget', Zarafa.plugins.desktopnotifications.js.settings.NotificationSettingsWidget);
