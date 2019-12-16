SELECT month, sum(num_of_creditcards) FROM trip_data GROUP by month;

SELECT month, sum(num_of_cash) FROM trip_data GROUP by month;

SELECT month, sum(sum_trip_miles) FROM trip_data GROUP by month;

SELECT month, sum(sum_trip_total) FROM trip_data GROUP by month;

SELECT month, company, sum(sum_trip_miles) FROM trip_data GROUP by month, company;
