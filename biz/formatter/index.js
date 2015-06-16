/**
 * Created by adi on 15-6-10.
 */

// module import
var fs = require('fs')
var Mustache = require('mustache')
var multiline = require('multiline')
var gui = require('nw.gui')
var notifier = require('node-notifier')
var beautify = require('js-beautify')

// common data
var $fileType = $('[name="fileType"]')
var $dropbox = $('#dropbox')
var $preview = $('#dropbox')
var $out = $('#out')
var clipboard = gui.Clipboard.get()

// 1. main
dragAndBrowser($dropbox, handleFiles)
$dropbox.on('input', handleCopy)
$fileType.on('change', handleFileType)

function handleFileType(e){
    var fileType, sourceCode, targetCode
    sourceCode = $dropbox.val()
    fileType = $(this).val()

    targetCode = getBeautifyCode(sourceCode, fileType)
    processResult(targetCode)
}

function handleCopy(e){
    var fileType, sourceCode, targetCode
    sourceCode = $dropbox.val()
    fileType = guessFileType(sourceCode)
    updateView($('[value="'+fileType+'"]'), {checked:true})

    targetCode = getBeautifyCode(sourceCode, fileType)
    processResult(targetCode)

    function updateView(el, props){
        el.prop(props)
    }
}

function handleFiles(files) {
    var file = files[0], sourceCode, targetCode
    sourceCode = fs.readFileSync(file.path, "utf8")
    updateView($('[value="'+file.type+'"]'), {checked:true})
    previewFile($preview, sourceCode)

    targetCode = getBeautifyCode(sourceCode, file.type)
    processResult(targetCode)

    function previewFile($el, code){
        $el.val(code)
    }
    function updateView(el, props){
        el.prop(props)
    }
}

// 2. partial
function processResult(targetCode){
    $out.val(targetCode)
    clipboard.set(targetCode, 'text')
    notifier.notify({'message':'代码已复制到剪切板！'})
}

function guessFileType(source){
    var reg_html = /\<\w+\>(?!'|")/gm
    var reg_css = /\.\w[\w\d]*\{/gm
    //var reg_js = /function\s+\w[\w\d-_$]*\(/gm
    var fileType
    if(reg_html.test(source)){
        return fileType = 'text/html'
    }
    if(reg_css.test(source)){
        return fileType = 'text/css'
    }
    //if(reg_js.test(source)){
    return fileType = 'text/javascript'
    //}
}

function getBeautifyCode(sourceCode, fileType){
    var targetCode
    switch (fileType){
        case 'text/javascript': targetCode = doBeautifyJS(sourceCode); break;
        case 'text/css': targetCode = doBeautifyCSS(sourceCode); break;
        case 'text/html': targetCode = doBeautifyHTML(sourceCode); break;
    }
    return targetCode
}

function doBeautifyJS(source, isPath){
    //@see https://github.com/beautify-web/js-beautify
    if(isPath){source = fs.readFileSync(source, "utf8")}
    var options = {
        "indent_size": 4,
        "indent_char": " ",
        "eol": "\n",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "space_after_anon_function": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "wrap_attributes": "auto",
        "wrap_attributes_indent_size": 4,
        "end_with_newline": true
    }
    var code = beautify.js(source, options)
    return code
}

function doBeautifyCSS(source, isPath){
    if(isPath){source = fs.readFileSync(source, "utf8")}
    var options = {
        "indent_size": 4
    }
    var code = beautify.css(source, options)
    return code
}

function doBeautifyHTML(source, isPath){
    if(isPath){source = fs.readFileSync(source, "utf8")}
    var options = {
        "indent_size": 4
    }
    var code = beautify.html(source, options)
    return code
}

// 3. utils

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