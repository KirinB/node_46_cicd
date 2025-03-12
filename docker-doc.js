/*
doc:https://docs.docker.com/reference/cli/docker/
FROM node:20.17.0-alpine

WORKDIR /home/app -- kể từ đây sẽ là từ thư mục này 

COPY package.json . -- vì đã nói ở trên nên . sẽ là /home/app

docker build tạo image:
docker build -t [name_image] .

IMAGE LIST: 
    -docker image ls (docker image list)

IMAGE REMOVE:
    -docker image remove id_image
    hoặc
    -docker image remove name_image

REMOVE && BUILD LẠI:
    -docker image remove -f image-be_cyber_media && docker build -t image-be_cyber_media . 


CONTAINER ----------------------------------
    CONTAINER RUN:
    -docker run -d(-d là không chiếm dụng terminal) -p(port server mà sẽ chạy bên trong docker) 3070:3069 --name cons-be_cyber_media image-be_cyber_media
    CONTAINER LIST:
    -docker container ls(lấy ra tất cả container ĐANG ONLINE)
    -docker ps(câu lệnh các lập trình viên hay dùng)
    -docker ps -a(lấy ra tất cả container ĐANG ONLINE và OFFLINE)

    CONTAINER Restart:
    -docker container restart id_name_container
TERMINAL:
    -docker logs id_ten_container

Tìm địa chỉ IP của một container (Lưu ý trong môi trường docker)
    -docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_DB_SQL_container

DOCKER COMPOSE -----------------------------------
    start:
        -docker compose up -d
    stop:
        -docker compose dơwn
HUB:
    -docker login
    -docker push name_container:tag
*/
