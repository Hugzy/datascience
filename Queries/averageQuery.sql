SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, sum(num_of_creditcards) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, sum(num_of_cash) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(sum_trip_miles) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(number_of_trips) as sum FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, company, sum(sum_trip_miles) FROM trip_data GROUP by month, company;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(sum_trip_total) as sum FROM trip_data GROUP by month order by month;

SELECT to_char(to_timestamp (1::text, 'MM'), 'TMmon');

SELECT company, sum(number_of_trips) as totalNumberOfTrips From trip_data group by company order by totalNumberOfTrips desc limit 10;

SELECT * FROM (SELECT company, avg(avg_trip_miles) as tripmiles, avg(avg_trip_total) as triptotal From trip_data group by company) as a order by (a.triptotal-a.tripmiles) desc limit 10;

SELECT company, avg(avg_trip_miles) as tripmiles, avg(avg_trip_total) as triptotal From trip_data group by company order by sum(number_of_trips) desc limit 10;

SELECT count(*) FROM cluster_data;

SELECT count(*) FROM heatmapdata_1;


SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(number_of_trips) as sumtrips, sum(sum_trip_total) as sumcost FROM trip_data GROUP by month order by month;

