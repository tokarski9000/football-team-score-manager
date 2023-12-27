<h1>Pilka menago</h1>

## Instalation
```
cp .env.example .env
composer install --ignore-platform-req=ext-dom --ignore-platform-req=ext-xml --ignore-platform-req=ext-curl --ignore-platform-req=ext-xmlwriter
composer update --ignore-platform-req=ext-dom --ignore-platform-req=ext-xml --ignore-platform-req=ext-curl --ignore-platform-req=ext-xmlwriter
sail composer update
sail build --no-cache
docker-compose down -v
sail up --build -d
sail npm install
sail npm run dev
```
