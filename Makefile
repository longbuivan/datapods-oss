.PHONY: start

start-docker:
    cd /datapod-server/docker/ && \
    docker-compose pull && \
    docker-compose build && \
    docker-compose up -d

start-kube:
    cd /datapod-server/kubernetes/ && \
    kubectl create -f namespace.yaml && \
    kubectl create -f mage.yaml && \
    kubectl create -f data-warehouse.yaml && \
    kubectl create -f database.yaml && \
    kubectl create -f visualization.yaml && \
    kubectl create -f ingress.yaml && \
    kubectl create -f audit-logging.yaml && \
    kubectl get pods -o wide -n analytics-project && \
    kubectl get services -o wide -n analytics-project

destroy-docker:
    cd /datapod-server/docker/ && \
    docker-compose down

destroy-kube:
    cd /datapod-server/kubernetes/ && \
    kubectl delete pods --namespace analytics-project --all && \
    kubectl delete deployments --namespace analytics-project --all && \
    kubectl delete services --namespace analytics-project --all && \
    kubectl delete namespace analytics-project  && \
    kubectl delete pvc --namespace analytics-project --all && \
    kubectl delete pv --namespace analytics-project --all