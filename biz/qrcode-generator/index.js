/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
var Mustache = require('mustache')
var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')
//var QRCode = require('qrcode')
var qr = require('qr-image')

// common data
var $dropbox = $('#dropbox')
var $out = $('#out')
var $go = $('#go')
var clipboard = gui.Clipboard.get()

// 1. main
$go.on('click', generator)


function generator(e){
    var text = $dropbox.val()
    var options = {
        ec_level: 'H',
        type: 'png'
    }
    var buffer = qr.imageSync(text, options)

    var tpl = multiline(function(){/*!@preserve
     data:{{mime}};base64,{{code}}
     */console.log});
    var base64 = Mustache.render(tpl, {mime:'image/'+options.type, code:buffer.toString('base64')})
    //base64.replace(/&#x2f;/ig, '/')

    previewFile($out, base64)
}


// 2. partial

function previewFile($el, code){
    $el.html('<img src="'+code+'">')
}

// 3. utils

