Ext.define('MyApp.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main-mainview',
    data: {
        name: 'MyApp'
    },

    stores: {
        menustore: {
            type: 'menustore'
        }
    }

});
