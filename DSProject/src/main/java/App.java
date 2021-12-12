import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;

import java.sql.Connection;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import static org.apache.spark.sql.functions.col;
import static org.apache.spark.sql.functions.explode;

public class App {
    public static String SPACE_DELIMITER = " ";

    static StructType schema = DataTypes.createStructType(new StructField[]{
            DataTypes.createStructField("taxi_id", DataTypes.IntegerType, true),
            DataTypes.createStructField("trip_start_timestamp", DataTypes.TimestampType, true),
            DataTypes.createStructField("trip_end_timestamp", DataTypes.TimestampType, true),
            DataTypes.createStructField("trip_seconds", DataTypes.IntegerType, true),
            DataTypes.createStructField("trip_miles", DataTypes.FloatType, true),
            DataTypes.createStructField("pickup_census_tract", DataTypes.IntegerType, true),
            DataTypes.createStructField("dropoff_census_tract", DataTypes.IntegerType, true),
            DataTypes.createStructField("pickup_community_area", DataTypes.IntegerType, true),
            DataTypes.createStructField("dropoff_community_area", DataTypes.IntegerType, true),
            DataTypes.createStructField("fare", DataTypes.FloatType, true),
            DataTypes.createStructField("tips", DataTypes.FloatType, true),
            DataTypes.createStructField("tolls", DataTypes.FloatType, true),
            DataTypes.createStructField("extras", DataTypes.FloatType, true),
            DataTypes.createStructField("trip_total", DataTypes.FloatType, true),
            DataTypes.createStructField("payment_type", DataTypes.StringType, true),
            DataTypes.createStructField("company", DataTypes.IntegerType, true),
            DataTypes.createStructField("pickup_latitude", DataTypes.IntegerType, true),
            DataTypes.createStructField("pickup_longitude", DataTypes.IntegerType, true),
            DataTypes.createStructField("pickup_location", DataTypes.StringType, true),
            DataTypes.createStructField("dropoff_latitude", DataTypes.IntegerType, true),
            DataTypes.createStructField("dropoff_longitude", DataTypes.IntegerType, true),
            DataTypes.createStructField("dropoff_location", DataTypes.StringType, true),
    });

    public static void main(String[] args) {

        // Setup
        SparkConf conf = new SparkConf().setMaster("local[*]").setAppName("DSProject");
        SparkSession ss = SparkSession.builder().appName("DSProject").config(conf).getOrCreate();
        Connection connect = PostgresConnection.connect();

        HeatmapData hm = new HeatmapData(ss, connect, schema);
        KMeansClustering kmc = new KMeansClustering(ss, connect, schema);
        AveragePriceLength avp = new AveragePriceLength(ss, connect, schema);
        hm.process();
        kmc.process();
        avp.process();

        ss.close();
    }
}