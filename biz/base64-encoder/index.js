/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
var Mustache = require('mustache')
var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')

// common data
var	$fileInput = $('#file')
var preview = document.getElementById('dropbox')
var dropbox = document.getElementById('dropbox')
var $out = $('#out')
var clipboard = gui.Clipboard.get()


// 1. dropbox drag
dropbox.addEventListener('dragenter', dragenter, false);
dropbox.addEventListener('dragover', dragover, false);
dropbox.addEventListener('drop', drop, false);
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    handleFiles(files);
}

// 2. dropbox click
$(dropbox).on('click', function(e){
    if(isElement($fileInput)){
        $fileInput.trigger('click')
        e.preventDefault()
    }
})
$fileInput.on('change', function (e) {
    handleFiles(this.files)
})

// utils

function handleFiles(files) {

    for (var i = 0; i < files.length; i++) {
        // ignore files which not the first one
        if (i>0) {return}

        // ignore files which not a image
        var file = files[i];
        var imageType = /^image\//;
        if (!imageType.test(file.type)) {
            continue;
        }

        // convert preview print clipboard and notice
        var base64 = file2base64(file)
        previewFile($(preview), base64)
        $out.text(generatorCSSImg(base64))
        clipboard.set(generatorCSSImg(base64), 'text')
        notifier.notify({'message':'css 代码已复制到剪切板！'})
    }
}

function file2base64(file){
    var code = fs.readFileSync(file.path, {encoding:'base64'})
    var tpl = multiline(function(){/*!@preserve
        data:{{mime}};base64,{{code}}
     */console.log});
    var base64 = Mustache.render(tpl, {mime:file.type, code:code})
    return base64.replace(/&#x2f;/ig, '/')
}

function previewFile($el, code){
    $el.html('<img src="'+code+'">')
}

function generatorCSSImg(code){
    return 'background-image:url("'+code+'")'
}


function isElement(el){
    if (el.length) {
        return !!el.length
    }
    return !!el
}






