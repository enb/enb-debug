# enb-debug

Пакет предоставляет конструктор технологий для [ENB][], способный обернуть
стандартные технологии `bemjson-to-html` в вызовы модуля [concap][], что даёт
возможность отлавливать вызовы методов объекта `console.*` внутри шаблонов
для последующего их вывода.

## How it works

Модуль [concap][] позволяет собирать вызовы методов объекта `console.*`
(путем подмены методов) и позже генерировать код, повторяющий вызовы.

В сгенерированной технологии вызов базовой технологии оборачивается в [concap][]
и собранные логи подмешиваясь к итогому HTML попадают в браузер.

## How to use

Установите пакет через NPM.

```sh
npm install enb-debug
```

И подключайте нужную `bemjson-to-html` технологию, используя конструктор.

```js
var toHtml = require('enb-bemxjst/techs/bemjson-to-html');
var toHtmlDebuggable = require('enb-debug/techs/to-html-debuggable').using(html);

// ... later in your config replace `html` variable with `htmlDebuggable`
nodeConfig.addTechs([
  // Полученной технологии совершенно не важно, что делает базовая.
  // Она просто вызывает её внутри себя с теми же опциями
  // и ожидает, что в результате её работы будет HTML.
  [toHtmlDebuggable, {/* те же опции */}]
]);
```

Happy debugging!

## License

MIT

[concap]: https://github.com/zxqfox/concap/
[ENB]: http://enb-make.info/
