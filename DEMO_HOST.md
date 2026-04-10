# Демо на своём сервере (SSH)

Кратко: на VPS ставите Node.js, клонируете репозиторий, собираете Next.js и запускаете с `--hostname 0.0.0.0`, чтобы сайт был доступен по `http://<IP>:порт`. Ниже — вариант для Ubuntu/Debian.

## Что понадобится

- VPS с публичным IP (или VPN, если коллега в той же сети).
- **Node.js 20 LTS** (или новее, совместимую с Next 16).
- Открытый порт в фаерволе облака и на сервере (например **3000** для витрины).

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

## Замечания по безопасности

- Это **демо**: не кладите секреты в `.env` на сервер без необходимости, не используйте как прод без HTTPS и нормального хостинга.
- Для постоянной ссылки с доменом и HTTPS позже можно добавить Nginx + Let’s Encrypt; для разового показа коллеге достаточно IP и порта.
