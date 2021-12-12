import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SaveMode;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.StructType;

import java.sql.Connection;
import java.util.Properties;

public class HeatmapData extends Operation {

    public HeatmapData(SparkSession ss, Connection connection, StructType st) {
        super(ss, connection, st);
    }

    @Override
    public void process() {
        for (int i = 1; i <= 12; i++) {
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

            input.createOrReplaceTempView("input");

            Dataset<Row> taxi_id = ss.read().option("multiLine", true).json(URL + "/1-taxi_id.json");
            Dataset<Row> pickup_latitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_latitude.json");
            Dataset<Row> pickup_longitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_longitude.json");
            Dataset<Row> dropoff_latitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_latitude.json");
            Dataset<Row> dropoff_longitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_longitude.json");

            taxi_id.createOrReplaceTempView("taxi");
            pickup_latitude.createOrReplaceTempView("latitude");
            pickup_longitude.createOrReplaceTempView("longitude");

            input.show();

            //taxi_id, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude
            Dataset<Row> heatmapData = ss.sql("SELECT taxi.taxi_id, latitude.pickup_latitude, longitude.pickup_longitude FROM input " +
                    "INNER JOIN latitude ON latitude.id = input.pickup_latitude " +
                    "INNER JOIN longitude ON longitude.id = input.pickup_longitude " +
                    "INNER JOIN taxi ON taxi.id = input.taxi_id" +
                    " WHERE " +
                    "input.pickup_latitude IS NOT NULL AND " +
                    "input.pickup_longitude IS NOT NULL");
            heatmapData.show();

            heatmapData.printSchema();
            heatmapData.write().mode(SaveMode.Append).jdbc(PostgresConnection.url, "heatmapdata_" + i, this.getProperties());
        }
    }

}
