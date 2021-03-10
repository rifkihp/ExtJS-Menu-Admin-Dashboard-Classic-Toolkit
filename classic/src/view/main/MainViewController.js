Ext.define('MyApp.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-mainview',

    onMenuBeforeRender: function() {
        var me = this,
            height = Ext.Element.getViewportHeight()- 64,
            refs = me.getReferences(),
            mainContainer = refs.mainContainer,
            navTree = refs.navigationTree;

        mainContainer.minHeight = height;
        navTree.setStyle({
            'min-height': height + 'px'
        });
    },

    onMenuBtnClick: function() {

        var me = this,
        refs = me.getReferences(),
        navTree = refs.navigationTree,
        mainContainer = refs.mainContainer,
        collapsing = !navTree.getMicro(),
        new_width = collapsing ? 64 : 250;

    if (Ext.isIE9m || !Ext.os.is.Desktop) {
        Ext.suspendLayouts();

        refs.menuLogo.setWidth(new_width);

        navTree.setWidth(new_width);
        navTree.setMicro(collapsing);

        Ext.resumeLayouts(); // do not flush the layout here...

        // No animation for IE9 or lower...
        mainContainer.layout.animatePolicy = mainContainer.layout.animate = null;
        mainContainer.updateLayout();  // ... since this will flush them
    }
    else {
        if (!collapsing) {
            // If we are leaving micro mode (expanding), we do that first so that the
            // text of the items in the navlist will be revealed by the animation.
            navTree.setMicro(false);
        }
        navTree.canMeasure = false;

        // Start this layout first since it does not require a layout
        refs.menuLogo.animate({dynamic: true, to: {width: new_width}});

        // Directly adjust the width config and then run the main wrap container layout
        // as the root layout (it and its chidren). This will cause the adjusted size to
        // be flushed to the element and animate to that new size.
        navTree.width = new_width;
        mainContainer.updateLayout({isRoot: true});
        navTree.el.addCls('nav-tree-animating');

        // We need to switch to micro mode on the navlist *after* the animation (this
        // allows the "sweep" to leave the item text in place until it is no longer
        // visible.
        if (collapsing) {
            navTree.on({
                afterlayoutanimation: function () {
                    navTree.setMicro(true);
                    navTree.el.removeCls('nav-tree-animating');
                    navTree.canMeasure = true;
                },
                single: true
            });
        }
    }
    }

});
