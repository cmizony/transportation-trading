## Dataset Source

Data available at [transborder.bts.gov](http://transborder.bts.gov/programs/international/transborder/index/Index\_Interface.html)

Timeseries data from Canada and Mexico (unit in Billion $) for:
* Rail
* Ship
* Air
* Truck
* Pipeline

##Quickstart

After downloading new CSV files use the bash script to process it to json format:

```sh
bash ./process_raw.sh
```

##TODO

* Use casperjS or similar framework to automate csv download
* Create back-end API to serve the json data
