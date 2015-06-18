/**
 * Created by adi on 15-6-10.
 */

var $ = require('jquery')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

$.support.cors = true
$.ajaxSettings.xhr = function(){return new XMLHttpRequest()}
var _reqData = {
    func: 'base64-encoder',
    src: 'xxoxx',
    options: {},
    error: {}
}


exports.report = function(reqData) {
    $.ajax({
        url: 'http://dev.duowan.com/lotto/2',
        method: 'post',
        data: reqData || _reqData
    }).done(function (data) {
        //console.log('xx')
    })
}
