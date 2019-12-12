from google.cloud import bigquery
import pandas as pd
import base64
from IPython.display import HTML
from IPython.display import FileLinks
import datetime



date = datetime.datetime(2016, 8, 1)


# Initiate bigquery client
bq = bigquery.Client()

# Change to 365 to get all values
for i in range(365):
    # Get the first table
    dt = date.strftime("%Y%m%d")
    print(dt)

    query = f"""
    SELECT
        *
    FROM
        `bigquery-public-data.google_analytics_sample.ga_sessions_{dt}`
    """

    # Create the query and convert to dataframe
    result = bq.query(query).to_dataframe()

    # View result
    result.to_csv(f'C:\\dev\\bigquerydata\\ga_sessions_{dt}.csv')
    date += datetime.timedelta(days=1)
