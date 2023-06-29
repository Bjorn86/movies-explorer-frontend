# Проект: Навигатор фильмов (frontend)

Дипломный проект выполненный в рамках курса "Веб-разработчик" от Яндекс Практикум. Проект представляет из себя фронтенд часть для проекта [Навигатор фильмов](https://github.com/Bjorn86/movies-explorer-api) также выполненного в рамках указанного выше учебного курса.

## Оглавление

- [Обзор проекта](#обзор-проекта)
  - [Задачи проекта](#задачи-проекта)
  - [Функциональность проекта](#функциональность-проекта)
  - [Screenshot](#screenshot)
  - [Директории проекта](#директории-проекта)
  - [Запуск проекта](#запуск-проекта)
  - [Ссылки](#ссылки)
- [Ход выполнения проекта](#ход-выполнения-проекта)
  - [Используемые технологии](#используемые-технологии)
  - [Чему я научился работая над проектом](#чему-я-научился-работая-над-проектом)
  - [Планы по доработке проекта](#планы-по-доработке-проекта)
- [Автор](#автор)

## Обзор проекта

### Задачи проекта

Проект был призван закрепить навыки frontend-разработки, фреймворка React, разработки SPA, и работе с React Router.

### Функциональность проекта

Функционально проект представляет из себя лендинг с портфолио автора, а также приложение для поиска фильмов как по названию так и формату (короткий метр / полный метр). У пользователя имеется возможность регистрации, авторизации, а также редактировании своих данных в приложении, возможность добавить понравившийся фильм в свою коллекцию сохранённых фильмов, при этом в коллекции сохранённых фильмов остаются указанные выше возможности поиска и фильтрации.

### Screenshot

![Desktop screenshot](./screenshot/movies-explorer-1.png)
![Desktop screenshot](./screenshot/movies-explorer-2.png)

### Директории проекта

- `src/components` — директория с компонентами
- `src/contexts` — директория с элементами контекста
- `src/hooks` — директория с пользовательскими хуками
- `src/images` — директория с файлами изображений
- `src/utils` — директория со вспомогательными файлами
- `src/vendor` — директория с файлами библиотек
  - `/fonts` — директория со шрифтами

### Запуск проекта

- `npm run build` — запуск проекта в режиме продакшн, с формированием файлов подготовленных к деплою в директории `/build`
- `npm start` — запуск проекта в режиме разработки

### Ссылки

- [Ссылка на репозиторий проекта](https://github.com/Bjorn86/movies-explorer-frontend)
- [Ссылка на страницу проекта](https://diplom.ld-webdev.nomoredomains.rocks/)
- [Ссылка на API сервер проекта](https://api.diplom.ld-webdev.nomoredomains.rocks)
- IP-адрес проекта: 51.250.11.115

## Ход выполнения проекта

### Используемые технологии

- HTML
- CSS
- JS
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Create React App](https://create-react-app.dev/)
- [uuid](https://www.npmjs.com/package/uuid)
- Адаптивная вёрстка
- Семантическая вёрстка

### Чему я научился работая над проектом

- Закрепил знания полученные во время учёбы
- Интересной задачей стала реализации компонента уведомлений

### Планы по доработке проекта

- [ ] Создать страницы просмотра детальной информации о фильме
- [x] Перенести информацию о статусах запросов, а также других действиях пользователя в уведомления
- [x] Доработать компонент уведомлений - добавить кнопку закрытия, пересмотреть логику присвоения UID

## Автор

**Данила Легкобытов**

- e-mail: [legkobytov-danila@yandex.ru](mailto:legkobytov-danila@yandex.ru)
- Telegram: [@danila_legkobytov](https://t.me/danila_legkobytov)
- LinkedIn: [in/danila-legkobytov](https://www.linkedin.com/in/danila-legkobytov/)
