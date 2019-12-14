import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.StructType;

import java.sql.Connection;

public abstract class Operation {
    final String URL = "hdfs://localhost:9000/chicagodata";

    public SparkSession ss;
    public StructType schema;
    public Connection connection;



    public Operation(SparkSession ss, Connection connection, StructType st) {
        this.ss = ss;
        this.schema = st;
        this.connection = connection;
    }

    public abstract void process();
}
