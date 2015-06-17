/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
var url = require('url')
var Mustache = require('mustache')
var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')

// common data
var $go = $('[name="go"]')
var $dropbox = $('#dropbox')
var $out = $('#out')
var clipboard = gui.Clipboard.get()

// 1. main
// @todo http://stackoverflow.com/questions/75980/best-practice-escape-or-encodeuri-encodeuricomponent
$dropbox.on('input', handleInput)
$go.on('change', handleInput)

function handleInput2(e){
    var src, dest, isEncode
    src = $dropbox.val()
    isEncode = $('[name="go"]:checked').val() === 'encode'? true:false
    if (isEncode) {
        dest = encodeURIComponent(src)
    }else{
        dest = decodeURIComponent(src)
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

