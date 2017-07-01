import React from 'react';
import Header from './header';


export class Home extends React.Component {

  componentDidMount() {
    let chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled":true,
      "dataDateFormat": "YYYY-MM-DD",
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth":true
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [{
        "id": "g1",
        "balloon":{
          "drop":true,
          "adjustBorderColor":false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA"
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
      },
      "valueScrollbar":{
        "oppositeAxis":false,
        "offset":50,
        "scrollbarHeight":10
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      },
      "dataProvider": [{
        "date": "2017-07-27",
        "value": 13
      }, {
        "date": "2017-07-28",
        "value": 11
      }, {
        "date": "2017-07-29",
        "value": 15
      }, {
        "date": "2017-07-30",
        "value": 16
      }, {
        "date": "2017-07-31",
        "value": 18
      }, {
        "date": "2017-08-01",
        "value": 13
      }, {
        "date": "2017-08-02",
        "value": 22
      }, {
        "date": "2017-08-03",
        "value": 23
      }, {
        "date": "2017-08-04",
        "value": 20
      }, {
        "date": "2017-08-05",
        "value": 17
      }, {
        "date": "2017-08-06",
        "value": 16
      }, {
        "date": "2017-08-07",
        "value": 18
      }, {
        "date": "2017-08-08",
        "value": 21
      }, {
        "date": "2017-08-09",
        "value": 26
      }, {
        "date": "2017-08-10",
        "value": 24
      }, {
        "date": "2017-08-11",
        "value": 29
      }, {
        "date": "2017-08-12",
        "value": 32
      }, {
        "date": "2017-08-13",
        "value": 18
      }]
    });
  }

  render () {

    const charStyle = {
      width: '100%',
      height: '500px',
      "margin-top": '100px',
      "margin-bottom": '100px'
    };

    return (
      <div className="row">
        <h3>THIS IS THE HOME FOR ABSOLUTE FINANCE</h3>

        <div id="chartdiv" style={charStyle}>

        </div>
      </div>


    );
  }
}

export default Home;