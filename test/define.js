module.exports = {
    setUp: function (callback) {
        this.wordDefine = require('../lib/main');
        this.wordDefine.connect(function(){
            callback();
        });
    },
    define: function(test){
        this.wordDefine.define('dictionary', function (err, res) {
            test.done();
        });
    }

};

