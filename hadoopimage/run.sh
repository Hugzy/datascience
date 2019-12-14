
docker cp ../chicagodata/data namenode:/chicagodata
docker exec namenode hdfs dfs -put /chicagodata /
docker exec -it namenode /bin/bash