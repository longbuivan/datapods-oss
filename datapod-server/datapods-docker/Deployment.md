# Deploy DataPods

## Deploying Docker Compose File Using Render

1. **Create a new Web Service on Render**

    Go to the Render dashboard and click on 'New Web Service'.

2. **Select Your Repository**

    Choose the repository that contains your Docker Compose file.

3. **Choose Environment**

    Select 'Docker' as your environment.

4. **Specify Your Docker Compose File**

    In the 'Docker Command' field, enter the command to run your Docker Compose file. Typically, this is `docker-compose up`.

5. **Advanced Settings (Optional)**

    If your application requires environment variables, you can add them in the 'Environment Variables' section.

6. **Deploy**

    Click 'Create Web Service'. Render will pull your code, build your Docker image, and deploy your Docker Compose file.

Remember to replace any placeholder values in your Docker Compose file with actual values before deploying.

For more detailed instructions, refer to the [official Render documentation](https://render.com/docs).

.PHONY: start

start:
    cd /path/to/your/project && \
    docker-compose pull && \
    docker-compose build && \
    docker-compose up -d


## Deploy to AWS EC2

> sudo yum install docker -y

> sudo systemctl enable docker

> sudo yum install nginx -y

> sudo nano /etc/nginx/conf.d/mageai.conf

```config
server {
    listen 80;

    server_name 18.133.28.231O;
    location / {
        proxy_pass http://localhost:6789;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> sudo systemctl start nginx


