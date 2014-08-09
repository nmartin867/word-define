module.exports = {
    setUp: function (callback) {
        this.wordDefine = require('../lib/main');
        this.wordDefine.connect(function(){
            callback();
        });
    },
    defineInDict: function (test) {
        this.wordDefine.defineInDict('wn', 'mom', function (err, res) {
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
            test.done();
        });
    }
};

