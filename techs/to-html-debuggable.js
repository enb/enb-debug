var concap = require('concap');

module.exports.using = function(baseTech) {
    return baseTech.buildFlow()
        .name('to-html-debuggable')
        .methods({
            render: function () {
                var render = this.__base.apply.bind(this.__base, this, arguments);
                var res = concap.capture(render);
                this._concapped = concap.getClean();
                return res;
            }
        })
        .builder(function(files) {
            var _this = this;
            return this.__base.apply(this, arguments)
                .catch(function(err) {
                    return "<pre>" + err.stack + "</pre>";
                })
                .then(function(res) {
                    var log = _this._concapped ?
                        '<script type="text/javascript">\n;' +
                            concap.render(_this._concapped) +
                        '\n<\/script>\n' : '';
                    return res + log;
                });
        })
        .createTech();
};
