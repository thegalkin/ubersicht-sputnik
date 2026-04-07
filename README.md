# Sputnik Clock — виджет для [Übersicht](https://github.com/felixhageloh/uebersicht)

Настольные часы в стиле «Спутник» (24-часовой циферблат, золотая минутная и бордовая часовая стрелки, секундная на внешнем круге). Обновление ~120 Hz.

## Требования

- macOS  
- [Übersicht](https://github.com/felixhageloh/uebersicht) установлен и запущен

## Установка

1. Склонируйте репозиторий (или скачайте `sputnik.jsx`).

2. Скопируйте `sputnik.jsx` в каталог виджетов Übersicht:

   ```bash
   cp sputnik.jsx ~/Library/Application\ Support/Übersicht/widgets/
   ```

   Либо сделайте симлинк, чтобы правки в клоне сразу подхватывались:

   ```bash
   ln -sf "$(pwd)/sputnik.jsx" ~/Library/Application\ Support/Übersicht/widgets/sputnik.jsx
   ```

3. В меню Übersicht обновите виджеты или перезапустите приложение.

## Позиция на экране

Координаты задаются в `className` в начале `sputnik.jsx` (`bottom`, `right`, размеры). Подстройте под свой монитор.
