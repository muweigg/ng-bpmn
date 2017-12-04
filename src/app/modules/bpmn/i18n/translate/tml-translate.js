let translations = require('./zh_CN');

const typeMap = {
    'StartEvent': '开始',
    'EndEvent': '结束',
    'ExclusiveGateway': '排他网关',
    'Task': '任务',
    'TextAnnotation': '文本注释',
};

module.exports = function customTranslate(template, replacements) {
    replacements = replacements || {};

    // Translate
    template = translations[template] || template;

    // Replace
    return template.replace(/{([^}]+)}/g, function(_, key) {
        return typeMap[replacements[key]] || '{' + key + '}';
    });
};
