docker build . -t pysparkexampleimage:latest 
docker run --rm -it --ip 172.200.0.240 --hostname pyspark --env-file hadoop.env --network hadoop -p 9999:9999 pysparkexampleimage /bin/bash