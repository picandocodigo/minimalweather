package pages

import (
	mw "github.com/elcuervo/minimalweather/minimalweather"
)

type CityWeather struct {
	City    mw.City    `json:"city"`
	Weather mw.Weather `json:"weather"`
	Unit    string     `json:"unit"`
	Cold    bool       `json:"cold"`
	Celsius bool       `json:"-"`
	JSON    string     `json:"-"`
}
