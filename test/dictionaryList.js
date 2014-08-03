module.exports = {
    setUp: function (callback) {
        this.wordDefine = require('../lib/main');
        this.wordDefine.connect(function(){
            callback();
        });
    },
    dictionaryList: function (test) {
        this.wordDefine.dictionaryList(function (err, res) {
            test.equal(typeof res[0].Id, 'string');
            test.equal(typeof res[0].Name, 'string');
            test.done();
        });
    }
};
