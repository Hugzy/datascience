import os
from pyspark.sql import SparkSession, SQLContext


def init_spark():
  spark = SparkSession.builder.appName("HelloWorld").getOrCreate()
  sc = spark.sparkContext
  return spark,sc

def main():
    spark, sc = init_spark()
    df = spark.read.csv("datasets/ga_sessions_20160801.csv", inferSchema=True, header=True)
    df.show()
main()