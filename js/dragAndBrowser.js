/**
 * Created by adi on 15-6-15.
 */


/**
 *
 * @param {String} id选择器
 * @param {Function} handleFiles
 * ... 回调函数 handleFiles(files)
 * ... files 浏览器 files对象数组，[{type, path},...]
 */

exports = function(id, handleFiles){
    var $el = $(id)
    var $file = $('<input type="file" style="display: none"/>')
    $file.insertAfter($el)

    $el.on('dblclick', dblclick)
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
    function dblclick(e){
        $file.trigger('click')
        e.preventDefault()
    }
}





