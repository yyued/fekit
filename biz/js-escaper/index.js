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
        dest = escapeJs(src)
    }else{
        dest = unescapeJs(src)
    }
    processResult(dest)
}

// 2. partial

function processResult(targetCode){
    $out.val(targetCode)
    clipboard.set(targetCode, 'text')
    notifier.notify({'message':'代码已复制到剪切板！'})
}

// https://github.com/joliss/js-string-escape
function escapeJs(str){
    return (''+str).replace(/["'\\\n\r\u2028\u2029]/g, function(char){
        switch(char){
            case '"':
            case "'":
            case '\\': return '\\'+ char
            case '\n': return '\\n'
            case '\r': return '\\r'
            case '\u2028': return '\\u2028'
            case '\u2029': return '\\u2029'
        }
    })
}

function unescapeJs(str){
    return (''+str).replace(/\\"|\\'|\\\\|\\n|\\r|\\u2028|\\u2029]/g, function(char){
        switch(char){
            case '\\"': return '"'
            case "\\'": return "'"
            case '\\\\': return '\\'
            case '\\n': return '\n'
            case '\\r': return '\r'
            case '\\u2028': return '\u2028'
            case '\\u2029': return '\u2029'
        }
    })
}

// 3. utils

