/**
 * Created by adi on 15-6-10.
 */

exports.encode = function(str) {
    return new Buffer(str).toString('base64')
}
exports.decode = function(str) {
    return new Buffer(str, 'base64').toString()
}