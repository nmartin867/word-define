/*
 * main.js: Top-level include.
 *
 * (C) 2014 Nick Martin
 * MIT LICENCE
 *
 */

var soap = require('soap');

function parseErr(soapErr, callback) {
    var parseString = require('xml2js').parseString;
    parseString(soapErr, {strict: false}, function (err, result) {
        if (err) {
            callback(soapErr);
        }
        callback(result['SOAP:ENVELOPE']['SOAP:BODY'][0]['SOAP:FAULT'][0]['DETAIL'][0]['ERROR'][0]['ERRORMESSAGE'][0]);
    });
};

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
    this.dictionaryList = function (callback) {
        this._soapClient.DictionaryList(function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result.DictionaryListResult.Dictionary);
        });
    };
    this.defineInDict = function (dictId, word, callback) {
        this._soapClient.DefineInDict({dictId: dictId, word: word}, function (err, result) {
            if (err) {
                parseErr(err.message, callback);
            }else{
                if (!result.DefineInDictResult.Definitions.Definition) {
                    callback(null, []);
                } else {
                    var definitions = [];
                    for (var i = 0; i < result.DefineInDictResult.Definitions.Definition.length; ++i) {
                        definitions.push(result.DefineInDictResult.Definitions.Definition[i].WordDefinition);
                    }
                    callback(null, definitions);
                }
            }
        });
    };
};

module.exports = exports = new WordDefine();
