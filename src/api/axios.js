import Axios from "axios";

export const CustomAxios = Axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "2a67439bfdmsh50ca1b3e9eb506cp170c66jsn87da1e9925a2",
    useQueryString: true,
  },
});
