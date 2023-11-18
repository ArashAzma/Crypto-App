import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart, Grid} from 'react-native-svg-charts';

import {DARK_BLUE, WHITE} from '../utils/Theme';

const CHART_DIMENSION = '80%';

function Chart() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -70];

  return (
    <LineChart
      style={styles.chart}
      data={data}
      svg={{stroke: WHITE}}
      contentInset={{top: 20, bottom: 20}}
    >
      <Grid />
    </LineChart>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
  },
  chart: {
    width: CHART_DIMENSION,
    height: 200,
  },
  text: {
    color: WHITE,
  },
});

export default Chart;
