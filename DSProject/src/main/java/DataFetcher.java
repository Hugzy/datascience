import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.StructType;

import java.util.HashMap;

public class DataFetcher {

    private static HashMap<String, Dataset<Row>> mappedData = new HashMap<>();

    final static String URL = "hdfs://localhost:9000/chicagodata";
    public static void fetch(SparkSession ss, StructType schema) {
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

            input.createOrReplaceTempView("input" + i);
        }
    }

    public static HashMap<String, Dataset<Row>> GetMapData(SparkSession ss) {
        if (mappedData.keySet().size() > 0) {
            return mappedData;
        }

        Dataset<Row> taxi_id = ss.read().option("multiLine", true).json(URL + "/1-taxi_id.json");
        Dataset<Row> company = ss.read().option("multiLine", true).json(URL + "/1-company.json");
        Dataset<Row> pickup_latitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_latitude.json");
        Dataset<Row> pickup_longitude = ss.read().option("multiLine", true).json(URL + "/1-pickup_longitude.json");
        Dataset<Row> dropoff_latitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_latitude.json");
        Dataset<Row> dropoff_longitude = ss.read().option("multiLine", true).json(URL + "/1-dropOff_longitude.json");

        mappedData.put("company", company);
        mappedData.put("taxi_id", taxi_id);
        mappedData.put("pickup_latitude", pickup_latitude);
        mappedData.put("pickup_longitude", pickup_longitude);
        mappedData.put("dropoff_latitude", dropoff_latitude);
        mappedData.put("dropoff_longitude", dropoff_longitude);

        return mappedData;

    }


}
