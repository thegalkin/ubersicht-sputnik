# Sputnik Clock — виджет для [Übersicht](https://github.com/felixhageloh/uebersicht)

Настольные часы в стиле «Спутник»: 24-часовой циферблат, золотая минутная и бордовая часовая стрелки, секундная на внешнем круге. Обновление ~120 Hz.

Репозиторий оформлен по [формату галереи виджетов](https://github.com/felixhageloh/uebersicht-widgets#widget-format): в корне лежат `widget.json`, `sputnik.widget.zip`, `screenshot.png` (516×320 для Retina), а также распакованная копия в каталоге `sputnik.widget/` для просмотра кода и pull request’ов.

## Требования

- macOS  
- [Übersicht](https://github.com/felixhageloh/uebersicht)

## Установка

**Вариант A — архив (как в галерее):** распакуйте `sputnik.widget.zip`, получится папка `sputnik.widget`. Переместите её в каталог виджетов:

```bash
# при необходимости удалите суффикс .widget из имени папки — Übersicht ожидает папку *.widget
open ~/Library/Application\ Support/Übersicht/widgets/
```

Перетащите туда папку `sputnik.widget` (Übersicht подхватывает `.jsx` внутри).

**Вариант B — один файл:** скопируйте `sputnik.jsx` (в корне или из `sputnik.widget/`) в:

```bash
cp sputnik.jsx ~/Library/Application\ Support/Übersicht/widgets/
```

Обновите виджеты в меню Übersicht или перезапустите приложение.

## Позиция на экране

В начале `sputnik.jsx` в `className` заданы `bottom`, `right` и размеры — подстройте под свой монитор.

## В галерею

Чтобы виджет попал в [каталог](https://github.com/felixhageloh/uebersicht-widgets), после публикации репозитория [создайте issue](https://github.com/felixhageloh/uebersicht-widgets/issues) и укажите URL репозитория.

## Обновление артефактов галереи

После правок в `sputnik.jsx`:

```bash
cp sputnik.jsx sputnik.widget/
zip -r sputnik.widget.zip sputnik.widget
# при необходимости обновите screenshot.png (258×160 или 516×320)
```
