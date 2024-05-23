.PHONY: start

start:
    cd /datapod-server/docker/ && \
    docker-compose pull && \
    docker-compose build &&

deploy:
    cd /datapod-server/docker/ && \
    docker-compose up