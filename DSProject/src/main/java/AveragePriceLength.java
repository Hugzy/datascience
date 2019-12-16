import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.StructType;

import org.apache.spark.sql.*;

import java.sql.Connection;
import java.util.HashMap;

public class AveragePriceLength extends Operation {
    public AveragePriceLength(SparkSession ss, Connection connection, StructType st) {
        super(ss, connection, st);
    }

    @Override
    public void process() {
        DataFetcher.fetch(ss, schema);
        HashMap<String, Dataset<Row>> mappedData = DataFetcher.GetMapData(ss);

        // Average price per mile per company
        mappedData.get("company").createOrReplaceTempView("company");


        for (int i = 1; i <= 12; i++) {
            Dataset<Row> tripData = ss.sql("SELECT " + i +" as month, AVG(trip_miles) as avg_trip_miles," +
                    "MAX(trip_miles) as max_trip_miles, " +
                    "SUM(trip_miles) as sum_trip_miles, " +
                    "AVG(trip_total) as avg_trip_total, " +
                    "MAX(trip_total) as max_trip_total, " +
                    "SUM(trip_total) as sum_trip_total, " +
                    "company.company, " +
                    "COUNT(company.company) as number_of_trips, " +
                    "AVG(tips) as avg_tips, " +
                    "COUNT(CASE WHEN payment_type = 'Credit Card' THEN 1 ELSE NULL END) as num_of_creditcards, " +
                    "COUNT(CASE WHEN payment_type = 'Cash' THEN 1 ELSE NULL END) as num_of_cash "+
                    "FROM input" + i + " " +
                    "INNER JOIN company on input" + i +".company = company.id " +
                    "WHERE trip_miles > 0 AND trip_total > 0 " +
                    "GROUP BY company.company ORDER BY COUNT(company) DESC");

            tripData.show();

            tripData.write().mode(SaveMode.Append).jdbc(PostgresConnection.url, "trip_data", getProperties());
        }

    }
}
