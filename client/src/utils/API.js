import axios from "axios";
const ApiKey = 'd8fc6a7a05fe981d498316ed91194d9d';
const polyApi = 'ed_5Kc2Wrznyf4U8Upim_3pyVBqDKnXS';

export default {
  //Find Stock using the marketstack API.  Used in the findStock component
  findStock: function (searchValue) {
    // return axios.get("https://api.marketstack.com/v1/intraday?access_key=" + ApiKey + "&symbols=" + searchValue + "&interval=1min");
    return axios.get("https://api.marketstack.com/v1/eod?access_key=" + ApiKey + "&symbols=" + searchValue + "&date_from=2000-05-20&date_to=2021-05-30&limit=365")
  },
  //Find Stock using marketstack API and then send it to the chart, used in the Chart component
  findChartInfo: function (searchValue) {
    return axios.get("https://api.marketstack.com/v1/eod?access_key=" + ApiKey + "&symbols=" + searchValue + "&date_from=2000-05-20&date_to=2021-05-30&limit=365")
    .then(res => res.data)
  },
  //Find info using the polygon API to get basic stock info
  findInfo: function (searchValue) {
    return axios.get("https://api.polygon.io/v1/meta/symbols/" + searchValue + "/company?&apiKey=" + polyApi);
  
  },
  //Get the watch list from the database so that it can be put on the page
  getWatchlist: function () {
    return axios.get('/api/users/watchlist')
  },
  //Add items to the watchlist in the database
  addToWatchlist: function (stock) {
    // safeguards from sending empty request to the backend
    if (!Object.keys(stock).length){
      return;
    }
    return axios.post('/api/users/watchlist', stock)
  },
  //Find stock news using the polygon API
  findNews: function(searchValue) {
    return axios.get('https://api.polygon.io/v2/reference/news?limit=1&order=descending&sort=published_utc&ticker=' + searchValue + '&published_utc.gte=2021-04-26&apiKey=' + polyApi)
  }
};

