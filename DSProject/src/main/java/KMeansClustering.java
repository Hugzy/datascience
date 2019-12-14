import org.apache.spark.ml.clustering.KMeans;
import org.apache.spark.ml.clustering.KMeansModel;
import org.apache.spark.ml.feature.VectorAssembler;
import org.apache.spark.ml.linalg.Vector;
import org.apache.spark.sql.*;
import org.apache.spark.sql.expressions.UserDefinedFunction;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static org.apache.spark.sql.functions.col;
import static org.apache.spark.sql.functions.udf;

public class KMeansClustering extends Operation {
    public KMeansClustering(SparkSession ss, Connection connection, StructType st) {
        super(ss, connection, st);
    }

    @Override
    public void process() {
        for (int i = 1; i <= 1; i++) {
            String path = "/chicago_taxi_trips_2016_";

            if (i < 10) {
                path = path + "0" + i + ".csv";
            } else {
                path = path + i + ".csv";
            }
            // Calculations
            Dataset<Row> input = ss.read()
                    .schema(schema)
                    .option("header", true)
                    .option("maxColumns", 65565)
                    .csv(URL + path);

            input.createOrReplaceTempView("input" + i);


        }

        Dataset<Row> taxi_id = ss.read().option("multiLine", true).json(URL + "/1-taxi_id.json");
        Dataset<Row> pickup_latitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_latitude.json");
        Dataset<Row> pickup_longitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_longitude.json");
        Dataset<Row> dropoff_latitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_latitude.json");
        Dataset<Row> dropoff_longitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_longitude.json");

        taxi_id.createOrReplaceTempView("taxi");
        pickup_latitude.createOrReplaceTempView("latitude");
        pickup_longitude.createOrReplaceTempView("longitude");

        StringBuilder query = new StringBuilder();
        for (int i = 1; i <= 1; i++) {
            if (i != 1)
                query.append(" UNION ");
            query.append("SELECT * FROM input").append(i);
        }

        Dataset<Row> allData = ss.sql(query.toString());

        allData.show();

        allData.createOrReplaceTempView("input");

        //taxi_id, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude
        Dataset<Row> kMeansData = ss.sql("SELECT latitude.pickup_latitude, longitude.pickup_longitude FROM input " +
                "INNER JOIN latitude ON latitude.id = input.pickup_latitude " +
                "INNER JOIN longitude ON longitude.id = input.pickup_longitude " +
                "INNER JOIN taxi ON taxi.id = input.taxi_id" +
                " WHERE " +
                "input.pickup_latitude IS NOT NULL AND " +
                "input.pickup_longitude IS NOT NULL");
        VectorAssembler vectorAssembler = new VectorAssembler()
                .setInputCols(new String[]{"pickup_latitude", "pickup_longitude"})
                .setOutputCol("features");
        Dataset<Row> features = vectorAssembler.transform(kMeansData).select("features");
        KMeans km = new KMeans().setK(12).setSeed(10);
        KMeansModel fit = km.fit(features);
        Dataset<Row> transform = fit.transform(features);

        Vector[] vectors = fit.clusterCenters();

        /*val toArr: Any => Array[Double] = _.asInstanceOf[DenseVector].toArray
        val toArrUdf = udf(toArr)
        val dataWithFeaturesArr = dataWithFeatures.withColumn("features_arr",toArrUdf('features))
        */

        UserDefinedFunction mode = udf(
                (Vector ss) -> ss.toArray(), DataTypes.createArrayType(DataTypes.DoubleType)
        );

        Dataset<Row> features1 = transform.select(col("prediction"), mode.apply(col("features")));

        Properties properties = new Properties();
        properties.put("user", PostgresConnection.user);
        properties.put("password", PostgresConnection.password);

        List<Row> row1 = new ArrayList<>();

        for (int i = 0; i < vectors.length; i++) {
            Vector vector = vectors[i];
            row1.add(RowFactory.create(i, vector.toArray()));
        }

        StructType sc = new StructType(new StructField[]{
                new StructField("index", DataTypes.IntegerType, false, Metadata.empty()),
                new StructField("features", DataTypes.createArrayType(DataTypes.DoubleType), false, Metadata.empty())
        });

        Dataset<Row> clusterCentroid = ss.createDataFrame(row1, sc);
        clusterCentroid.printSchema();
        clusterCentroid.write().mode(SaveMode.Overwrite).jdbc(PostgresConnection.url, "cluster_centroids", properties);

        transform.printSchema();
        features1.write().mode(SaveMode.Append).jdbc(PostgresConnection.url, "cluster_data", properties);

    }
}
