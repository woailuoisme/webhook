docker login  --username ailuoga --password ailuoga
docker-compose build base
docker tag php-base:latest ailuoga/starter:8.2-latest
docker push ailuoga/starter:8.2-latest
docker rmi  ailuoga/starter:8.2-latest
