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
import java.util.HashMap;
import java.util.List;

import static org.apache.spark.sql.functions.col;
import static org.apache.spark.sql.functions.udf;

public class KMeansClustering extends Operation {
    public KMeansClustering(SparkSession ss, Connection connection, StructType st) {
        super(ss, connection, st);
    }

    @Override
    public void process() {

        DataFetcher.fetch(ss, schema);
        HashMap<String, Dataset<Row>> mappedData = DataFetcher.GetMapData(ss);

        mappedData.get("taxi_id").createOrReplaceTempView("taxi");
        mappedData.get("pickup_latitude").createOrReplaceTempView("latitude");
        mappedData.get("pickup_longitude").createOrReplaceTempView("longitude");
        mappedData.get("company").createOrReplaceTempView("company");

        StringBuilder query = new StringBuilder();
        for (int i = 1; i <= 12; i++) {
            if (i != 1)
                query.append(" UNION ");
            query.append("SELECT * FROM input").append(i);
        }

        Dataset<Row> allData = ss.sql(query.toString());

        allData.show();

        allData.createOrReplaceTempView("input");

        //taxi_id, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude
        Dataset<Row> kMeansData = ss.sql("SELECT input.trip_seconds, input.trip_miles, " +
                "input.trip_total, input.tips, " +
                "input.payment_type, company.company, " +
                "latitude.pickup_latitude, longitude.pickup_longitude " +
                "FROM input " +
                "INNER JOIN latitude ON latitude.id = input.pickup_latitude " +
                "INNER JOIN longitude ON longitude.id = input.pickup_longitude " +
                "INNER JOIN taxi ON taxi.id = input.taxi_id " +
                "INNER JOIN company on company.id = input.company" +
                " WHERE " +
                "input.pickup_latitude IS NOT NULL AND " +
                "input.pickup_longitude IS NOT NULL");
        VectorAssembler vectorAssembler = new VectorAssembler()
                .setInputCols(new String[]{"pickup_latitude", "pickup_longitude"})
                .setOutputCol("features");
        Dataset<Row> features = vectorAssembler.transform(kMeansData).select("features", "trip_seconds", "trip_miles", "trip_total", "tips", "payment_type", "company");
        KMeans km = new KMeans().setK(12).setSeed(10);
        KMeansModel kMeansModel = km.fit(features);
        Dataset<Row> predictions = kMeansModel.transform(features);

        Vector[] clusterCenters = kMeansModel.clusterCenters();

        UserDefinedFunction mode = udf(
                (Vector ss) -> ss.toArray(), DataTypes.createArrayType(DataTypes.DoubleType)
        );

        Dataset<Row> clusterData = predictions.select(col("prediction"), mode.apply(
                col("features")),
                col("trip_seconds"),
                col("trip_miles"),
                col("trip_total"), col("tips"),
                col("payment_type"),
                col("company"));

        List<Row> clusterCentroidRows = new ArrayList<>();

        for (int i = 0; i < clusterCenters.length; i++) {
            Vector vector = clusterCenters[i];
            clusterCentroidRows.add(RowFactory.create(i, vector.toArray()));
        }

        StructType sc = new StructType(new StructField[]{
                new StructField("index", DataTypes.IntegerType, false, Metadata.empty()),
                new StructField("features", DataTypes.createArrayType(DataTypes.DoubleType), false, Metadata.empty())
        });

        Dataset<Row> clusterCentroid = ss.createDataFrame(clusterCentroidRows, sc);
        clusterCentroid.printSchema();
        clusterCentroid.write().mode(SaveMode.Overwrite).jdbc(PostgresConnection.url, "cluster_centroids", this.getProperties());

        predictions.printSchema();
        clusterData.write().mode(SaveMode.Overwrite).jdbc(PostgresConnection.url, "cluster_data", this.getProperties());
    }
}
