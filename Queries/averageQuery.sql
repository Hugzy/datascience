SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, sum(num_of_creditcards) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, sum(num_of_cash) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(sum_trip_miles) FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(number_of_trips) as sum FROM trip_data GROUP by month;

SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as month_name, company, sum(sum_trip_miles) FROM trip_data GROUP by month, company;

SELECT to_char(to_timestamp (1::text, 'MM'), 'TMmon')
