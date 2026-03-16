import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';

const CalHeatmapComponent = ({evData}) => {
  const calContainerRef = useRef(null);

  useEffect(() => {
    const cal = new CalHeatmap();
    const low = -1.1;
    const high = 21.1;

    console.log('Data on useEffect:', JSON.stringify(evData, null, 2));
    if (!evData || !calContainerRef.current) {
      console.log('Data not ready or container not mounted');
      return;
    }
  
    cal.paint({
      data: {
        source: evData
    },
      range: 8, 
      date: {start: new Date('2024-04-01')},
      scale: {
        color: {
            type: 'quantize',
            domain: [low, high],
            scheme: 'YlOrRd'
        },
      },
      domain: {
          type: 'month',
          gutter: 8, 
          label: {text: 'MMM', textAlign: 'start', position: 'top'},
      },
      subDomain: {type: 'ghDay', radius: 0, width: 3, height: 4, gutter: 2},
    },
    [
        [
            Tooltip,
            {
                text: function (date, value, dayjsDate){
                    return (
                        (value ? value + ' ℃' : 'No data') + ' on ' + dayjsDate.format('LL')
                    );
                },
            }
        ],
    ]
);

    // Cleanup function to potentially remove the calendar or clean up any bindings
    return () => {
      cal.destroy();
    };
  }, [evData]);

  return <div ref={calContainerRef} id="cal-heat-map"></div>;
};

export default CalHeatmapComponent;
