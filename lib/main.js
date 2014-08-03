/*
 * main.js: Top-level include.
 *
 * (C) 2014 Nick Martin
 * MIT LICENCE
 *
 */

var soap = require('soap');

function WordDefine() {};

WordDefine.prototype.connect = function(complete){
    var serviceUrl = 'http://services.aonaware.com/DictService/DictService.asmx?WSDL';
    soap.createClient(serviceUrl, function (err, client) {
        if (err) {
            complete(err);
            return;
        }
        WordDefine.prototype.client = client;
        complete();
    });
};

WordDefine.prototype.dictionaryList = function (callback) {
    WordDefine.prototype.client.DictionaryList(function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result.DictionaryListResult.Dictionary);
    });
};

WordDefine.prototype.define = function (word, callback) {
    WordDefine.prototype.client.Define({word: word}, function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result.DefineResult.Definitions);
    });
};

module.exports = exports = new WordDefine();
