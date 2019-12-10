docker cp ../bigquerydata namenode:/bigquerydata
docker exec namenode hdfs dfs -put /bigquerydata /