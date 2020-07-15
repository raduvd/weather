import React, { Component } from "react";
import { getFiveDaysForecast } from "./api/OpenWeatherMapEndpoints";
import { Row } from "./Row";
class App extends Component {
  state = {
    row1: {
      cityName: "Belis",
      lat: 46.682368,
      lon: 23.034809,
      picturePath: "pics/Belis.PNG",
      rowData: { day1: {}, day2: {}, day3: {}, day4: {}, day5: {} },
    },
  };

  componentDidMount() {
    let newObj = { ...this.state.row1 };
    console.log(newObj);
    newObj.rowData = this.getRow(
      this.state.row1.cityName,
      this.state.row1.lat,
      this.state.row1.lon
    );
    this.setState({ row1: newObj });
  }

  getRow(cityName, lat, lon) {
    let response = localStorage.getItem("responseAsCookie1");
    if (!response) {
      response = getFiveDaysForecast(lat, lon);
      localStorage.setItem("responseAsCookie1", JSON.stringify(response));
    }
    let newRes = JSON.parse(response);

    let day1 = this.processDay(this.filterDays(newRes.data.list, 0));
    let day2 = this.processDay(this.filterDays(newRes.data.list, 1));
    let day3 = this.processDay(this.filterDays(newRes.data.list, 2));
    let day4 = this.processDay(this.filterDays(newRes.data.list, 3));
    let day5 = this.processDay(this.filterDays(newRes.data.list, 4));

    let rowData = {
      day1: day1,
      day2: day2,
      day3: day3,
      day4: day4,
      day5: day5,
    };
    return rowData;
  }

  processDay(list) {
    if (list.lenght === 0) return;
    let weatherDescriptionPerHour = list.map((el) => {
      return new Date(el.dt_txt).getHours() + ": " + el.weather[0].description;
    });

    let worstForecastForTheDay = list.map((el) => {
      return this.rankWeatherDescription(el.weather[0].id);
    });

    worstForecastForTheDay.sort((el1, el2) => {
      return el1.rank - el2.rank;
    });

    return {
      dayOfWeek: new Date(list[0].dt_txt).toDateString(),
      weatherDescriptionPerHour: weatherDescriptionPerHour,
      worstForecastForTheDay: worstForecastForTheDay[0].description,
    };
  }

  //vezi https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 pentru id-urile astea
  rankWeatherDescription(id) {
    if (id >= 200 && id < 300) {
      return { description: "Thunderstorm", rank: 0 };
    } else if (id >= 500 && id < 600) {
      return { description: "Rain", rank: 1 };
    } else if (id >= 600 && id < 700) {
      return { description: "Snow", rank: 2 };
    } else if (id >= 300 && id < 400) {
      return { description: "Drizzle", rank: 3 };
    } else if (id >= 700 && id < 800) {
      return {
        description: "Atmosferic cond, like fog or tornado",
        rank: 4,
      };
    } else if (id >= 801 && id < 810) {
      return {
        description: "Cloudy but no rain",
        rank: 5,
      };
    } else if (id === 800) {
      return { description: "Clear", rank: 6 };
    } else {
      return { description: "Undetermined", rank: 7 };
    }
  }

  filterDays(list, dayNumber) {
    return list.filter((el) => {
      let day1 = new Date().getDate() + dayNumber;
      let date = new Date(el.dt_txt).getDate();
      return day1 === date;
    });
  }

  render() {
    return (
      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>City/Village</th>
              <th>Location on Map</th>
              <th>Day1</th>
              <th>Day2</th>
              <th>Day3</th>
              <th>Day4</th>
              <th>Day5</th>
            </tr>
          </thead>
          <tbody>
            <Row rowData={this.state.row1} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
