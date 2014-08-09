/*
 * main.js: Top-level include.
 *
 * (C) 2014 Nick Martin
 * MIT LICENCE
 *
 */

var soap = require('soap');

function WordDefine() {
    this._soapClient;
    this.connect = function (callback) {
        if (this._soapClient) {
            callback();
            return;
        }
        var serviceUrl = 'http://services.aonaware.com/DictService/DictService.asmx?WSDL';
        soap.createClient(serviceUrl, (function (context) {
            return function (err, client) {
                if (!err) {
                    context._soapClient = client;
                    callback();
                }
            };
        })(this));

    };
    this.define = function (word, callback) {
        this._soapClient.Define({word: word}, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result.DefineResult.Definitions);
        });
    };
    this.dictionaryList = function(callback){
        this._soapClient.DictionaryList(function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result.DictionaryListResult.Dictionary);
        });
    };
};

module.exports = exports = new WordDefine();
