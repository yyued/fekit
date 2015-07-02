/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
// var url = require('url')
// var Mustache = require('mustache')
// var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')

// common data
var $go = $('#go')
var $out = $('#caret-output')
var clipboard = gui.Clipboard.get()

// 1. main
$go.on('click', function(e){
    var text = $out.html()
    clipboard.set(text, 'text')
    notifier.notify({'message':'代码已复制到剪切板！'})
})


