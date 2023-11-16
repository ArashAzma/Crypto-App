import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart, Grid} from 'react-native-svg-charts';

import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';

const CHART_DIMENSION = screenWidth * 0.6;
function Chart() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  return (
    <LineChart
      style={styles.chart}
      data={data}
      svg={{stroke: 'white'}}
      contentInset={{top: 20, bottom: 20}}
    >
      <Grid />
    </LineChart>
  );
}
const styles = StyleSheet.create({
  chart: {
    width: CHART_DIMENSION,
    height: CHART_DIMENSION,
  },
  text: {
    color: WHITE,
  },
});

export default Chart;
