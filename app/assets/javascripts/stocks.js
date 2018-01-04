// news feed
$(document).on('turbolinks:load', function() {
  if (typeof stockTicker !== 'undefined') {
    newsFeed();
    historicalChart();
  }

  if ($('portfolio')) {
    pieChart();
  };
});


var newsFeed = function() {
  $.ajax({
  url: `http://localhost:3000/stocks/stock_news/${stockTicker}.json`,
  dataType: 'json',
  method: "GET",
  success: function(data) {
    for (let news in data) {
      newsObj = data[news];
      $listitem = $("<li>");
      $news_url = $("<a>").attr("href", newsObj.url);
      $headline = $("<p>").text(newsObj.headline);
      $source = $("<span>").addClass("source_news").text(newsObj.source);
      $link = $news_url.append($headline);
      $news_item = $listitem.append($link).append($source);
      $("#news").prepend($news_item);
    }

  }
  });
};

var historicalChart = function() {
  $.getJSON(`http://localhost:3000/stocks/historical_chart/${stockTicker}.json`, function(data) {
    var parseData = data.map(function(obj) {
      var dateConcat = Date.parse(obj.date)
      return [dateConcat, obj.open, obj.high, obj.low, obj.close]
    })
    console.log(parseData)
    // Create the chart
    var chart = Highcharts.stockChart('container', {

      chart: {
        height: 400
      },

      title: {
        text: 'Historical Stock Data'
      },

      rangeSelector: {
        selected: 1
      },

      series: [
        {
          name: 'Stock Price',
          data: parseData,
          type: 'area',
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              chart: {
                height: 300
              },
              subtitle: {
                text: null
              },
              navigator: {
                enabled: false
              }
            }
          }
        ]
      }
    });
  });
}



var pieChart = function() {
// Create the chart
Highcharts.chart('portfolio', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Breakdown of your portfolio by sector'
    },
    subtitle: {
        text: 'Click the slices to view holdings'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'IE',
            y: 56.33,
            drilldown: 'IE'
        }, {
            name: 'Chrome',
            y: 24.03,
            drilldown: 'Chrome'
        }, {
            name: 'Firefox',
            y: 10.38,
            drilldown: 'Firefox'
        }, {
            name: 'Safari',
            y: 4.77,
            drilldown: 'Safari'
        }, {
            name: 'Opera',
            y: 0.91,
            drilldown: 'Opera'
        }, {
            name: 'Proprietary or Undetectable',
            y: 0.2,
            drilldown: null
        }]
    }],
    drilldown: {
        series: [{
            name: 'IE',
            id: 'IE',
            data: [
                ['v11.0', 24.13],
                ['v8.0', 17.2],
                ['v9.0', 8.11],
                ['v10.0', 5.33],
                ['v6.0', 1.06],
                ['v7.0', 0.5]
            ]
        }, {
            name: 'Chrome',
            id: 'Chrome',
            data: [
                ['v40.0', 5],
                ['v41.0', 4.32],
                ['v42.0', 3.68],
                ['v39.0', 2.96],
                ['v36.0', 2.53],
                ['v43.0', 1.45],
                ['v31.0', 1.24],
                ['v35.0', 0.85],
                ['v38.0', 0.6],
                ['v32.0', 0.55],
                ['v37.0', 0.38],
                ['v33.0', 0.19],
                ['v34.0', 0.14],
                ['v30.0', 0.14]
            ]
        }, {
            name: 'Firefox',
            id: 'Firefox',
            data: [
                ['v35', 2.76],
                ['v36', 2.32],
                ['v37', 2.31],
                ['v34', 1.27],
                ['v38', 1.02],
                ['v31', 0.33],
                ['v33', 0.22],
                ['v32', 0.15]
            ]
        }, {
            name: 'Safari',
            id: 'Safari',
            data: [
                ['v8.0', 2.56],
                ['v7.1', 0.77],
                ['v5.1', 0.42],
                ['v5.0', 0.3],
                ['v6.1', 0.29],
                ['v7.0', 0.26],
                ['v6.2', 0.17]
            ]
        }, {
            name: 'Opera',
            id: 'Opera',
            data: [
                ['v12.x', 0.34],
                ['v28', 0.24],
                ['v27', 0.17],
                ['v29', 0.16]
            ]
        }]
    }
});
}


// Error messages timeout function


$(document).ready(() => {
    setTimeout(() => {
        $(".alert").fadeOut('slow');
    }, 3000)
})
