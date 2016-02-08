var concap = require('concap');

module.exports.using = function(baseTech) {
    return baseTech.buildFlow()
        .name('to-html-debuggable')
        .builder(function(files) {
            concap.hijack();
            return this.__base.apply(this, arguments)
                .catch(function(err) {
                    return "<pre>" + err.stack + "</pre>";
                })
                .then(function(res) {
                    concap.restore();
                    return res +
                        '<script type="text/javascript">\n;' +
                            concap.render(concap.getClean()) +
                        '\n<\/script>\n';
                });
        })
        .createTech();
};
