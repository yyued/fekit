/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
var Mustache = require('mustache')
var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')
var _ = require('lodash')

// common data
var $go = $('[name="go"]')
var $dropbox = $('#dropbox')
var $out = $('#out')
var clipboard = gui.Clipboard.get()

// 1. main
$dropbox.on('input', handleInput)
$go.on('change', handleInput)

function handleInput(e){
    var src, dest, isEscape
    src = $dropbox.val()
    isEscape = $('[name="go"]:checked').val() === 'escape'? true:false
    if (isEscape) {
        dest = _.escape(src)
    }else{
        dest = _.unescape(src)
    }
    processResult(dest)
}

// 2. partial

function processResult(targetCode){
    $out.val(targetCode)
    clipboard.set(targetCode, 'text')
    notifier.notify({'message':'代码已复制到剪切板！'})
}



// 3. utils

