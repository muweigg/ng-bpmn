const assign = require('lodash/assign');
let translations = require('./zh_CN');

module.exports = function(language = {}) {

    translations = assign({}, translations, language);

    const typeMap = {
        'StartEvent': translations['Start Event'],
        'EndEvent': translations['End Event'],
        'ExclusiveGateway': translations['Exclusive Gateway'],
        'Task': translations['Task'],
        'TextAnnotation': translations['Text Annotation'],
    };

    console.log('translations: ', translations, typeMap);

    function customTranslate(template, replacements) {
        replacements = replacements || {};

        // Translate
        template = translations[template] || template;

        // Replace
        return template.replace(/{([^}]+)}/g, function(_, key) {
            return typeMap[replacements[key]] || '{' + key + '}';
        });
    };

    return {
        translate: [ 'value', customTranslate ]
    }
}