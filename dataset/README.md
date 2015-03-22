#Transportation dataset

##Source

[transborder.bts.gov](http://transborder.bts.gov/programs/international/transborder/index/Index\_Interface.html)

Timeseries data from Canada and Mexico (unit in Billion $) for:
* Rail
* Ship
* Air
* Truck
* Pipeline

##Quickstart

Bash script to compile json output from csv files

```sh
bash ./process_raw.sh
```

##TODO

* Use casperjS or similar framework to automate csv download
* Set-up monthly cronjob to update dataset
