Ext.namespace('Zarafa.plugins.desktopnotifications');

/**
 * @class Zarafa.plugins.desktopnotifications.DesktopNotificationsPlugin
 * @extends Zarafa.core.Plugin
 * This class is used for adding files from the users's Dropbox folder
 * to his emails as attachments
 */
Zarafa.plugins.desktopnotifications.DesktopNotificationsPlugin = Ext.extend(Zarafa.core.Plugin, {
	/**
	 * initialises insertion point for plugin
	 * @protected
	 */
	initPlugin : function()
	{
		Zarafa.plugins.desktopnotifications.DesktopNotificationsPlugin.superclass.initPlugin.apply(this, arguments);

		this.registerInsertionPoint('context.settings.category.plugins', this.createSettingsWidget, this);
	},

	/**
	 * Return the instance of {@link Zarafa.plugins.pimfolder.PimPluginSettingsWidget}.
	 *
	 * @return {Zarafa.plugins.pimfolder.PimPluginSettingswidget} An instance of the settings widget
	 * @private
	 */
	createSettingsWidget : function()
	{
		return {
			xtype : 'zarafa.notificationsettingswidget',
			plugin : this
		};
	}
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'desktopnotifications',
		displayName : _('Desktop Notifications Plugin'),
		//about : Zarafa.plugins.desktopnotifications.ABOUT,
		pluginConstructor : Zarafa.plugins.desktopnotifications.DesktopNotificationsPlugin
	}));
});
