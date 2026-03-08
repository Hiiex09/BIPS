<!-- Pull an image from docker hub -->

docker pull nginx

<!-- Run a container from an image -->

docker run -d -p 8080:80 nginx

<!-- List running container -->

docker ps

<!-- Stop a running container -->

docker stop container_id

<!-- Remove a container -->

docker rm container_id

<!-- List all images -->

docker images
