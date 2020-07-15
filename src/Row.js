import React, { Component } from "react";
export class Row extends Component {
  render() {
    console.log("props", this.props);
    return (
      <tr>
        <td data-label="City/Village">{this.props.rowData.cityName}</td>
        <td data-label="Location on Map">
          <img
            className="ui medium image"
            alt="no img"
            src={this.props.rowData.picturePath}
          ></img>
        </td>
        <td data-label="Day1">
          <h4>{this.props.rowData.rowData.day1.dayOfWeek} </h4>
          <h6>{this.props.rowData.rowData.day2.weatherDescriptionPerHour} </h6>
          <h4>{this.props.rowData.rowData.day1.worstForecastForTheDay} </h4>
        </td>

        <td data-label="Day2">
          {" "}
          <h4>{this.props.rowData.rowData.day2.dayOfWeek} </h4>
          <h6>{this.props.rowData.rowData.day2.weatherDescriptionPerHour} </h6>
          <h4>{this.props.rowData.rowData.day2.worstForecastForTheDay} </h4>
        </td>
        <td data-label="Day3">
          {" "}
          <h4>{this.props.rowData.rowData.day3.dayOfWeek} </h4>
          <h6>{this.props.rowData.rowData.day3.weatherDescriptionPerHour} </h6>
          <h4>{this.props.rowData.rowData.day3.worstForecastForTheDay} </h4>
        </td>
        <td data-label="Day4">
          {" "}
          <h4>{this.props.rowData.rowData.day4.dayOfWeek} </h4>
          <h6>{this.props.rowData.rowData.day4.weatherDescriptionPerHour} </h6>
          <h4>{this.props.rowData.rowData.day4.worstForecastForTheDay} </h4>
        </td>
        <td data-label="Day5">
          {" "}
          <h4>{this.props.rowData.rowData.day5.dayOfWeek} </h4>
          <h6>{this.props.rowData.rowData.day5.weatherDescriptionPerHour} </h6>
          <h4>{this.props.rowData.rowData.day5.worstForecastForTheDay} </h4>
        </td>
      </tr>
    );
  }
}
