from __future__ import print_function

import sys
import re


from pyspark import SparkConf,SparkContext
from pyspark.sql import SparkSession, SQLContext
from pyspark.sql.types import *


schema = StructType([
    StructField("Count", IntegerType()),
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

if __name__ == "__main__":

    spark = SparkSession \
        .builder \
        .appName("DSProjet") \
        .getOrCreate()

    sqlContext = SQLContext(spark)

    #conf = SparkConf().set('spark.driver.host', '127.0.0.1')
    #sc = SparkContext(master='local', appName='DSProject', conf=conf)

    #df = sqlContext.read.format('com.databricks.spark.csv').options(header='true', inferschema='true').load('Uber-Jan-Feb-FOIL.csv')

    df = sqlContext.read.csv(
        "/bigquerydata/ga_sessions_20160801.csv", header=True, schema=schema
    )

    #df.createOrReplaceTempView("data")
    #df = spark.read.load("/bigquerydata/ga_sessions_20160801.csv",
    #                 format="csv", sep=",", schema=schema, header="true")
    df.show(n=2, truncate=True)

    df.select("Count", "visitNumber").filter(df.visitNumber == 9).show()

    #sqlContext.sql("SELECT visitNumber from data where visitNumber == 152").show()

    #.filter(lambda line: len(line)<=16)
    #res = sc.textFile("/bigquerydata/ga_sessions_20160801.csv").map(lambda line: re.sub(',(?=(?:[^"]*"[^"]*")*[^"]*$)', ';', line)).map(lambda line: line.split(";")).filter(lambda line: len(line) == 16)
    #res.foreach(print)
    #print(res)