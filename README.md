# Language School GB

## Первоначальная локальная установка

Сначала необходимо скопировать, переименовать и настроить при необходимости конфигурационные файлы:

* `/.env.example` в `/.env`
* `/backend/.env.example` в `/backend/.env`
* `/frontend/.env.example` в `/frontend/.env`

Далее - создать образы и запустить контейнеры:
```shell
docker-compose build
docker-compose up -d
```

Установить необходимые пакеты с помощью composer, сгенерировать ключ приложения Laravel, запустить миграции:
```shell
docker-compose exec php bash
composer install
php artisan key:generate
php artisan migrate:fresh --seed
```

### Настройка фронта изначально будет работать и так, если надо установить плагин
Зайти в контейнер на фронт
```shell
docker-compose exec frontend sh
```
Выйти из редактора 'ctrl + D'

Для установки на проде требуется заменить в `/src/.env` параметры:
* `APP_ENV=local` на `APP_ENV=production`
* `APP_DEBUG=true` на `APP_DEBUG=false`

Команда запуска контейнера
```shell
docker-compose up -d
```

Команда удаления контейнера
```shell
docker-compose down
```

### Помощь

* Если приложение локально не подключается к API
```shell
sudo chown -R www-data:www-data path/**/backend/storage
sudo chown -R www-data:www-data path/**/backend/bootsrap
```

