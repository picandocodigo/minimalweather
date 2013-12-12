package pages

import(
	mw "github.com/elcuervo/minimalweather/minimalweather"
)

type CityWeather struct {
        City        mw.City        `json:"city"`
	Weather     mw.Weather     `json:"weather"`
        Unit        string      `json:"unit"`
        JSON        string      `json:"-"`
}
