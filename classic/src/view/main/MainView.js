
Ext.define('MyApp.view.main.MainView',{
    extend: 'Ext.container.Viewport',
    xtype: 'app-main-view',

    requires: [
        'MyApp.view.main.MainViewController',
        'MyApp.view.main.MainViewModel'
    ],

    controller: 'main-mainview',
    viewModel: {
        type: 'main-mainview'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar shadow',
        height: 64,
        items: [{
            xtype: 'component',
            cls: 'sencha-logo',
            reference: 'menuLogo',
            html: '<div class="main-logo"><img src="resources/images/company-logo.png">Sencha</div>',
            width: 250
        }, {
            margin: '0 0 0 8',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            handler: 'onMenuBtnClick'
        }]
    }, {
        xtype: 'container',
        reference: 'mainContainer',
        listeners: {
            beforerender: 'onMenuBeforeRender'
        },
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretchmax',

            // Tell the layout to animate the x/width of the child items.
            animate: true,
            animatePolicy: {
                x: true,
                width: true
            }
        },

        scrollable: 'y',

        items: [{
            xtype: 'treelist',
            ui: 'navigation',
            reference: 'navigationTree',
            width: 250,
            bind: {
                store: '{menustore}'
            },
            expanderFirst: false,
            expanderOnly: false
        }, {
            xtype: 'container',
            flex: 1
        }]
    }]
});
