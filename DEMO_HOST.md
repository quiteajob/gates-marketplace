# Демо на своём сервере (SSH)

Кратко: клонируете репозиторий, переходите в **`marketplace/frontend`**, там `npm ci` → `npm run build` → запуск. Для доступа снаружи — либо порт **3000**, либо домен через **Nginx → 127.0.0.1:3000**.

### Обязательно помнить

- Сборка и `npm start` всегда из каталога **`.../marketplace/frontend`** (не из корня монорепозитория).
- Нужен **полный** `git clone` репозитория (есть папки `app/`, `lib/`, `components/`).
- Если на сервере уже есть **nvm**, достаточно `source ~/.nvm/nvm.sh` перед `npm` (отдельно NodeSource ставить не нужно).
- Скрипт **`npm run build`** вызывает **`next build --webpack`**. На части хостингов Turbopack по умолчанию падает с `Cannot assign requested address (os error 99)` при обработке CSS — Webpack этого не делает. Локально при желании Turbopack: `npm run build:turbo`.

## Что понадобится

- VPS с публичным IP (или VPN).
- **Node.js 20+** (подходит и новее через nvm; для Next 16 хватает).
- Открытый порт **3000** (если заходят по `http://IP:3000`) и/или настроенный **прокси на 3000** для домена.

## 1. Подключение по SSH

```bash
ssh пользователь@IP_СЕРВЕРА
```

## 2. Установка Node.js (пример: NodeSource, Ubuntu)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
node -v   # v20.x
```

## 3. Код проекта

```bash
sudo mkdir -p /opt/gates-marketplace
sudo chown "$USER:$USER" /opt/gates-marketplace
cd /opt/gates-marketplace
git clone https://github.com/quiteajob/gates-marketplace.git .
```

(Если репозиторий приватный — настройте SSH-ключ на GitHub или используйте `git clone` по URL с токеном.)

## 4. Витрина маркетплейса (основной демо-сайт)

```bash
cd marketplace/frontend
npm ci
npm run build
npm run start:host
```

Скрипт `start:host` слушает **0.0.0.0:3000**. Коллега открывает:

`http://ВАШ_IP:3000`

Остановка: `Ctrl+C`.

### Фаервол на сервере (ufw)

```bash
sudo ufw allow 22/tcp
sudo ufw allow 3000/tcp
sudo ufw enable
sudo ufw status
```

В панели облака (AWS, Yandex, Timeweb и т.д.) откройте тот же **ingress** для порта 3000.

## 5. Чтобы процесс не падал после выхода из SSH — PM2

```bash
sudo npm install -g pm2
cd /opt/gates-marketplace/marketplace/frontend
pm2 start npm --name gates-vitrina -- run start:host
pm2 save
pm2 startup   # выполните одну suggested-команду от pm2
```

Просмотр логов: `pm2 logs gates-vitrina`. Остановка: `pm2 stop gates-vitrina`.

## 6. Кабинет продавца (опционально, второй порт)

Порты не должны совпадать. В `seller-cabinet/frontend` скрипт `start:host` уже на **3001**.

```bash
cd /opt/gates-marketplace/seller-cabinet/frontend
npm ci
npm run build
npm run start:host
```

Коллега: `http://ВАШ_IP:3001`. В **ufw** и облаке откройте также **3001**.

Через PM2:

```bash
cd /opt/gates-marketplace/seller-cabinet/frontend
pm2 start npm --name gates-seller -- run start:host
pm2 save
```

## 7. Режим разработки (быстрее пересобрать, но тяжелее и не для продакшена)

```bash
cd marketplace/frontend
npm ci
npm run dev:host
```

Тот же порт **3000**, горячая перезагрузка.

## 8. Демо на своём домене (вместо старой папки `avorota.na4u.ru`)

Next.js **не** является набором файлов для «DocumentRoot» как у PHP-сайта: нужен **запущенный Node** и **обратный прокси** (Nginx или Apache), который по имени домена отдаёт трафик на `http://127.0.0.1:3000`.

### Шаг 1 — удалить старую демо-папку и клонировать репозиторий под тем же именем

Если панель/домен привязаны к каталогу `~/avorota.na4u.ru`, старое содержимое можно **полностью удалить** и клонировать **gates-marketplace** именно в `avorota.na4u.ru` (корень репозитория; витрина — в `marketplace/frontend`):

```bash
cd ~
rm -rf avorota.na4u.ru
git clone https://github.com/quiteajob/gates-marketplace.git avorota.na4u.ru
cd avorota.na4u.ru/marketplace/frontend
source ~/.nvm/nvm.sh
npm ci
npm run build
```

Запуск **за Nginx** (слушать только localhost, наружу — порт 80/443 у веб-сервера):

```bash
npm run start:proxy
```

Или через PM2:

```bash
pm2 start npm --name gates-vitrina -- run start:proxy
pm2 save
```

### Шаг 2 — Nginx

Пример готового сервера — файл в репозитории: [`deploy/nginx-avorota-demo.conf.example`](deploy/nginx-avorota-demo.conf.example). Его нужно подключить в вашу установку Nginx (или адаптировать в панели хостинга: «проксирование на порт 3000»).

Проверка и перезагрузка на своём VPS:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Если **нет root** и Nginx настраивает только техподдержка — пришлите им: «нужен reverse proxy с `avorota.na4u.ru` на `http://127.0.0.1:3000` для Node-приложения».

### Шаг 3 — DNS

У регистратора домена **A-запись** `avorota` → IP сервера (скорее уже так и было).

### Важно

- Папка `avorota.na4u.ru` после клона содержит **весь монорепозиторий**; собирать и запускать нужно из **`avorota.na4u.ru/marketplace/frontend`**.
- Без прокси домен будет либо показывать старый статический сайт, либо ошибку панели — **обязателен** прокси на порт 3000 (или на тот порт, где вы подняли `next start`).

## Замечания по безопасности

- Это **демо**: не кладите секреты в `.env` на сервер без необходимости, не используйте как прод без HTTPS и нормального хостинга.
- Для постоянной ссылки с доменом и HTTPS позже можно добавить Nginx + Let’s Encrypt; для разового показа коллеге достаточно IP и порта.
