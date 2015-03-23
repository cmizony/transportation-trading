#!/bin/bash

countries=(canada mexico)
transportations=(truck ship air pipeline rail)

echo "var dataset = [" > transBorder.js

for country in "${countries[@]}"
do
	for transportation in "${transportations[@]}"
	do
		grep "^[0-9]" "$country/$transportation.csv" | while read -r line
		do
			year=`cut -d ',' -f 1 <<< $line`
			month=`cut -d ',' -f 2 <<< $line`
			importValue=`cut -d ',' -f 4 <<< $line`
			exportValue=`cut -d ',' -f 6 <<< $line`

			echo "{\"country\":\"$country\", \"transportation\":\"$transportation\", \"year\":$year, \"month\":$month, \"import\":$importValue, \"export\":$exportValue}," >> transBorder.js
		done
	done
done

echo "]" >> transBorder.js
