
## Deploy everything with Railway template

With the temploy I created for DataPods, where you can one-click to deploy [demo-ready]() for data platfrom.

https://railway.com/template/8-f-rn?referralCode=vyY5rL


[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/8-f-rn?referralCode=vyY5rL)


## Build Image

docker build --platform="linux/amd64" -t longed/superset:latest .

docker build --platform="linux/amd64" -t longed/mageai:latest .

docker build --platform="linux/amd64" -t longed/grafana:latest .

docker build --platform="linux/amd64" -t longed/postgres:latest .


docker push longed/mageai:latest

docker push longed/superset:latest

docker push longed/grafana:latest

docker push longed/postgres:latest


## Deployment

With Railway:

- [Mage AI]
- [Postgres]
- [Grafana]
- [pgAdmin]
