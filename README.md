# DataPods Project

<div style="text-align: center; background: linear-gradient(45deg, #1a365d, #2a4365); color: white;">
    <h1 style="font-size: 2.5em; margin-bottom: 10px;">The Data Foundation Project</h1>
</div>

## Description

<!-- ![Background](/docs/assets/background.jpeg) -->
<sub>If you have been spent late night with data ingestion and data migration</sub>

- This project data project includes lightweight k8s yaml files for creating the development environment, testing environment, Proof of Concept, Proof of Service or even support for **Small Business**.

- With DataPods [DPs],  maximize the number of times to provision services for creating data transformations.

- Supported Scalability and Resiliency by features of Kubernetes.

### Prerequisites

- You need to have a basic knowledge of containerization and microservices.

- Docker containers or Kubernetes is PLUS, below picture provides curated selection of third party for DataPods.

<!-- ![Service Collection](/docs/assets/servicesCollection.png) -->

Check out the reference documentation for more information and know why DataPods is available:


|  Feature | Service | Description |
|--- | --- | --- |
|Data Ingestion & Integration | [Mage]() | Helping to easy connect and ingest data from multiple sources.|
| Database | [PostgreSQL]() | Storing internal data, metadata, or even data warehouse. |
| Data Warehouse | [Clickhouse (optional)]() <br> [duckdb]() | Building CUBE, OLAP |
| Visualization | [Metabase]() | Visualizing charts, dashboard |
| Audit and logging | [Prometheus]() | Getting metrics from system, maintaining infrastructure. |

*Note: Reaching out to me if you have any questions help help needs*

## (Option 1) Running Docker

* Docker is a platform that allows you to automate the deployment, scaling, and management of applications. It uses containerization technology to bundle an application and its dependencies into a single object.

* Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services. Then, with a single command, you create and start all the services from your configuration.

Here's a step-by-step guide on how to deploy your application using Docker Compose:

Ensure Docker and Docker Compose are installed on your machine. You can check this by running `docker --version` and `docker-compose --version` in your terminal.

Navigate to the directory containing your `docker-compose.yml` file. In your case, it's `/path/to/your/project`.

Pull the latest versions of all the images used by the services defined in your `docker-compose.yml` file by running `docker-compose pull`.

Build your services using `docker-compose build`. This will create Docker images for your services.

Finally, run your services in detached mode (in the background) using `docker-compose up -d`.

Here's how you can do this in your terminal:

```makefile
.PHONY: start

start:
    cd /path/to/your/project && \
    docker-compose pull && \
    docker-compose build && \
    docker-compose up -d
```

## (Option 2) Running Kubernetes

Install some packages of plugin that support for development and testing.

Note: the K8s is a holistic solution where you can deploy the resource everywhere: on-premises, AKS, EKS, etc

## Installation

### 1. Create resources

Run these following command line for creating pods/services/storage/roles/etc...

```shell

# Create pods and services

kubectl create -f namespace.yaml
kubectl create -f mage.yaml
kubectl create -f data-warehouse.yaml
kubectl create -f database.yaml
kubectl create -f visualization.yaml
kubectl create -f ingress.yaml
kubectl create -f audit-logging.yaml
# Verify pods and services

kubectl get pods -o wide -n analytics-project
kubectl get services -o wide -n analytics-project
```

### 2. Install dependencies

Interact with mage server by using this command:

```shell
kubectl exec -it mage-server --namespace=analytics-project -- shell
```

Install requirements for starting mage data pipeline:

```shell

# Assuming the pipline is moving data from s3 to postgresql and clickhouse

pip install mage-ai[s3]

pip install mage-ai[postgres]

pip install mage-ai[clickhouse]

```

### 3. Forwarding port of pods to localhost

In order to access the pods via localhost, we have to forward the ports from pods to localhost,

```shell

kubectl port-forward --namespace=analytics-project mage-server 6789:6789
kubectl port-forward --namespace=analytics-project clickhouse-67b4d5dd57 9000:9000
kubectl port-forward --namespace=analytics-project service/grafana 3000:3000

```

Once trigger run the job on Mage to load data to postgres and clickhouse.

### 4. Interact with Postgres and Clickhouse with:

```shell

# Note: change to your postgres and clickhouse pod ID

kubectl exec -it postgres-7f4c94884f-8v47r --namespace=analytics-project -- psql -h localhost -U ps_user --password -p 5432 ps_db

kubectl exec -it clickhouse-67b4d5dd57-lkb5l --namespace=analytics-project -- clickhouse client

```

Additional Script

```sql

CREATE TABLE titanic
(
    `Age` Float32,
    `Fare` Float32,
    `Parch` Float32,
    `Pclass` Float32,
    `SibSp` Float32,
    `Survived` Float32
)
ENGINE = MergeTree
PRIMARY KEY tuple()


\conninfo

\dt

-- verify the count

select count(1) from public.titanic;

```

### 5. Tears down project

Make you you have tear down your project to save resources of machine

```shell
kubectl delete pods --namespace analytics-project --all
kubectl delete deployments --namespace analytics-project --all
kubectl delete services --namespace analytics-project --all
```

## Conclusions

Try to use this project and see the documentation, this project can be the old school learning project but foundations of distributed data project.

References:

- [Data Engineering Handbook](https://de-book.longdatadevlog.com)
- [Youtube Channel](https://www.youtube.com/@longdatadevlog)

## Enhancement and ready for MVP

Specify the domain name for application, since the project is using Cluster IP for ingressing services and domain, then:

### 1. Get Cluster IP

```shell
kubectl get services -n analytics-project
```

### 2. Update IPs into `/etc/hosts` of Cluster with `sudo` permissions

```shell
vim /etc/hosts

# <CLUSTER-IP> subdomain.domain.io
# <CLUSTER-IP> subdomain.domain.io
```

### 3. Access with your domain

<!-- ![Access](/docs/assets/viz-etl.png) -->

### 4. Connect to database

Getting your Cluster IPs by this command

```shell
kubectl get pods -o wide -n analytics-project

# Example of results
# NAME                          READY   STATUS    RESTARTS      AGE    IP                NODE       NOMINATED NODE   READINESS GATES
# postgres-7f4c94884f-kknpz     1/1     Running   1 (65m ago)   160m   192.168.194.96    orbstack   <none>           <none>
# clickhouse-68687f8995-j4tpc   1/1     Running   1 (65m ago)   160m   192.168.194.95    orbstack   <none>           <none>
# mage-server                   1/1     Running   1 (65m ago)   82m    192.168.194.93    orbstack   <none>           <none>
# grafana-684d8b87db-89l9r      1/1     Running   0             25m    192.168.194.114   orbstack   <none>           <none>
```

Connect to database using Grafana data source and start to visualize your data!

<!-- ![Connect database](/docs/assets/connect-db.png) -->

## Demo

Contact for demonstration and proof of services

[mailto:longbuivan95@gmail.com](mailto:longbuivan95@gmail.com)

![](/docs/assets/DemoLive.gif)


## Launch Data Services

### 1. Access to datapod-app and Create landing page image

```bash
docker build --no-cache -t landing_page:v01 .

[+] Building 137.5s (11/11) FINISHED
 => exporting to image                                                                                  16.5s
 => => exporting layers                                                                                 16.4s
 => => writing image sha256:bcb279eaf357801be49169582a57f2a52237ff044814b0dd1f222b7bb23e835d             0.0s
 => => naming to docker.io/library/landing_page:v01
```

### 2. Acccess to datapod-server and compose up docker-compose file

```bash
docker-compose up -d

[+] Running 6/6
 ✔ Container datapods-docker-redis-1           Running                                                   0.0s
 ✔ Container superset_db                       Running                                                   0.0s
 ✔ Container datapods-docker-landingpage-1     Started                                                   1.1s
 ✔ Container datapods-docker-mage-1            Running                                                   0.0s
 ✔ Container superset                          Running                                                   0.0s
 ✔ Container datapods-docker-nginx_superset-1  Running
```

## License
By contributing, you agree that your contributions will be licensed under its [BSD 3-Clause License](LICENSE).

## Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
