
    // gobal lib
    var _ = require('lodash')
    var $ = require('jquery')
    var Mustache = require('mustache')
    var multiline = require('multiline')
    var menuJSON = require('./js/menu.json')


    // gobal env
    var gui = require('nw.gui');
    if (process.platform === "darwin") {
        var mb = new gui.Menu({type: 'menubar'});
        mb.createMacBuiltin('RoboPaint', {
            hideEdit: false
        });
        gui.Window.get().menu = mb;
    }


    // gobal shortcut
    var shortcut = new gui.Shortcut({ key: 'Ctrl+T' })
    shortcut.on('active', function(){
//        alert(this.key)
    })
    shortcut.on('failed', function(){
//        alert(this.key+' err! ')
    })
    gui.App.registerGlobalHotKey(shortcut)


    // gobal database
    var db = openDatabase('mydb', '1.0', 'db showcase', 2*1024*1024)
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
        tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
        tx.executeSql('INSERT INTO foo (id, text) VALUES (2, "luyao")');
    })
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                // alert(results.rows.item(i).text);
            }
        });
    });

    // Menu render
    renderMenu()
    function renderMenu(){
        var el, data, tpl
        el = $('.Nav')
        data = menuJSON
        tpl = multiline(function(){/*!@preserve
         {{#menu}}
         <div class="group">
         <div class="group__name">{{name}}</div>
         <div class="group__list">
         {{#items}}
         <div class="group__item {{#default}}-active{{/default}}" data-path="{{path}}">{{name}}</div>
         {{/items}}
         </div>
         </div>
         {{/menu}}
         */console.log});
        el.html(Mustache.render(tpl, data))
    }



    // Menu events
    var $menu = $('.Nav'), $targetPage = $('#targetPage');
    $menu.on('click', '[data-path]', function(e){
        $menu.find('[data-path]').removeClass('-active')
        var p = $(this).addClass('-active').data('path')
        $targetPage.attr('src', calcPath(p))
    })
    $targetPage.attr('src', calcPath(getDefaultPage(menuJSON)))

    function calcPath(p){
        return 'biz/'+p+'/index.html'
    }
    function getDefaultPage(menuJSON){
        var arr = []
        _.each(menuJSON.menu, function (v) {
            arr = arr.concat(v.items)
        })
        return _.find(arr, {default:true}).path
    }
