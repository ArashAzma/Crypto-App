import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LineChart, Grid, YAxis} from 'react-native-svg-charts';

import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

const CHART_DIMENSION = '85%';
const YAXIS_DIMENSION = '15%';

function Chart() {
  const contentInset = {top: 20, bottom: 20, left: 15, right: 15};

  return (
    <View style={styles.container}>
      <Computed>
        <YAxis
          style={styles.yAxis}
          data={state$.get().pinnedCoin.priceArray.slice(-15)}
          contentInset={contentInset}
          svg={{
            fill: WHITE,
            fontSize: 10,
            fontWeight: '400',
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}$`}
        />
        <LineChart
          style={styles.chart}
          data={state$.get().pinnedCoin.priceArray.slice(-20)}
          svg={{stroke: WHITE}}
          contentInset={contentInset}
        >
          <Grid />
        </LineChart>
      </Computed>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.9,
    borderRadius: 24,
  },
  chart: {
    width: CHART_DIMENSION,
    height: 200,
  },
  yAxis: {
    width: YAXIS_DIMENSION,
    height: 200,
  },
  text: {
    color: WHITE,
  },
});

export default Chart;
