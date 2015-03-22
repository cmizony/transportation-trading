#!/bin/bash

countries=(canada mexico)
transportations=(truck ship air pipeline rail)

echo "[" > transBorder.json

for country in "${countries[@]}"
do
	for transportation in "${transportations[@]}"
	do
		grep "^[0-9]" "$country/$transportation.csv" | while read -r line
		do
			year=`cut -d ',' -f 1 <<< $line`
			month=`cut -d ',' -f 2 <<< $line`
			importValue=`cut -d ',' -f 3 <<< $line`
			exportValue=`cut -d ',' -f 5 <<< $line`

			echo "[{\"country\":\"$country\", \"transportation\":\"$transportation\", \"year\":$year, \"month\":$month, \"import\":$importValue, \"export\":$exportValue}]," >> transBorder.json
		done
	done
done

echo "]" >> transBorder.json
