# Datenguide Web Data Connector

Web Data Connector for Datenguide to import statistical data into Tableau.



## Importing data into Tableau

A working installation of Tableau is required. For more information visit https://www.tableau.com.
There is also a free community version of Tableau: Tableau Public. Visit https://public.tableau.com
for more information and download options for your platform. 

* Open Tableau, select "Connect To a Server -> Web Data Connector"


<img src="https://raw.githubusercontent.com/datenguide/datenguide-wdc/master/docs/assets/connect.png" width="200">


* Navigate to a running instance of datenguide Web Data Connector
* Enter the URL to the graphl-endpoint of datenguide, click 'Test Connection' to
ensure the connection is working
* Select a region and one or more statistics to import
* Click 'Import'


<img src="https://raw.githubusercontent.com/datenguide/datenguide-wdc/master/docs/assets/wdc_ui.png" width="700">
The selected statistics are now available in Tableau.

## Visualizing data in Tableau

* Drag a table to the main area, click 'Update now' to fetch the table data
* Open a Tableau Worksheet
* Set Measures, Dimension and Marks. Check the Tableau documentation for details on how to work with Tableau.

This is an example visualization of the WAHL09 statistic as a starting point: 

![Example Tableau Visualization](https://raw.githubusercontent.com/datenguide/datenguide-wdc/master/docs/assets/wahl09_viz.png)

## Running the web connector locally (for development or testing)

* Clone the repository
* `yarn install`
* `yarn dev`
* The web connector will be running at `http://localhost:3000`
* To work on the web connector, Tableau offers a Simulator (as the web connector cannot do anything useful on its own).
See https://tableau.github.io/webdataconnector/docs/#run-the-simulator for more information on how to set this up.
