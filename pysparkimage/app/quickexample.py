from __future__ import print_function

import sys
import re


from pyspark import SparkConf,SparkContext
from pyspark.sql import SparkSession, SQLContext
from pyspark.sql.types import *
from pyspark.sql.functions import *

schema = StructType([
    StructField("", IntegerType()),
    StructField("visitorId", StringType()),
    StructField("visitNumber", IntegerType()),
    StructField("visitId", StringType()),
    StructField("visitStartTime", StringType()),
    StructField("date", StringType()),
    StructField("totals", StringType()),
    StructField("trafficSource", StringType()),
    StructField("device", StringType()),
    StructField("geoNetwork", StringType()),
    StructField("customDimensions", StringType()),
    StructField("hits", StringType()),
    StructField("fullVisitorId", StringType()),
    StructField("userId", StringType()),
    StructField("channelGrouping", StringType()),
    StructField("socialEngagementType", StringType()),

])

def init_spark():
  spark = SparkSession.builder.appName("DSProjet").getOrCreate()
  sc = spark.sparkContext
  return spark,sc

def main():
    spark, sc = init_spark()
    sqlContext = SQLContext(spark)
    df = spark.read.csv("hdfs://namenode/bigquerydata/ga_sessions_20160801.csv", schema=schema, header=True)
    attrs = vars(df.hits)
    print(attrs)
    #df.where(size(col("hits")) < 32766).show()

if __name__ == "__main__":
    main()
