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
var $dropbox = $('#dropbox')
var $preview = $('#dropbox')
var $out = $('#out')
var clipboard = gui.Clipboard.get()

// 1. main
dragAndBrowser($dropbox, handleFiles)
$dropbox.on('paste', handlePaste)


// 2. partial
function handlePaste(e){
    e = e.originalEvent
    if (e.clipboardData) {
        // Get the items from the clipboard
        var items = e.clipboardData.items;
        if (items) {
            // Loop through all items, looking for any kind of image
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    // We need to represent the image as a file,
                    var blob = items[i].getAsFile();

                    // The URL can then be used as the source of an image
                    createImage(blob);

                }
            }
        }
    }

    /* Creates a new image from a given source */
    function createImage(blob) {
        var pastedImage = document.createElement('img')
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) { aImg.src = e.target.result; };
        })(pastedImage);
        reader.readAsDataURL(blob)
        $dropbox.html(pastedImage)

        setTimeout(function(){
            var base64 = $dropbox.find('img').attr('src')
            $out.text(generatorCSSImg(base64))
            clipboard.set(generatorCSSImg(base64), 'text')
            notifier.notify({'message':'css 代码已复制到剪切板！'})
        }, 50)

    }
}

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
        previewFile($preview, base64)
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

// 3. utils

function isElement(el){
    if (el.length) {
        return !!el.length
    }
    return !!el
}

function dragAndBrowser(el, handleFiles){
    var $el = $(el)
    var $file = $('<input type="file" style="display: none"/>')
    $file.insertAfter($el)

    $el.on('dblclick', function(e){
        $file.trigger('click')
        e.preventDefault()
    })
    $file.on('change', function (e) {
        handleFiles(this.files)
    })

    $el.on('dragenter', dragenter)
    $el.on('dragover', dragover)
    $el.on('drop', drop)

    function dragenter(e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function dragover(e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function drop(e) {
        e.stopPropagation()
        e.preventDefault()

        var files = e.originalEvent.dataTransfer.files
        handleFiles(files)
    }

}