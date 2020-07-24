import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = WIDTH * 0.8
const HEIGHT = Dimensions.get('window').height;
const CARD_HEIGHT = HEIGHT * 0.25;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.8)',
    paddingBottom: 5,
    marginBottom: 15
  },
  label: {
    color: 'grey',
    fontSize: 13
  },
  action: {
    color: 'rgba(0, 100, 255, 0.7)',
    fontSize: 13
  },
  spacer: {
    width: WIDTH * 0.5
  },
});

export const BSItemScroll = ({ navigation, data, label, action, initialBS, targetBS }) => {
  const x = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: true });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(action)}>
          <Text style={styles.action}>See All</Text>
        </TouchableOpacity>
      </View>
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={data}
        horizontal
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ width: CARD_WIDTH / 8 }} />}
        // ItemSeparatorComponent={() => <View style={styles.spacer} />}
        renderItem={({ item, index }) => <ItemCard {...{ item, x, index }} />}
        {...{ onScroll }}
      />
    </View>
  );
};

const itemStyles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH
  },
  card: {
    width: CARD_WIDTH * 0.9,
    height: CARD_HEIGHT,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

const ItemCard = ({ item, x, index }) => {
  const position = Animated.subtract(index * CARD_WIDTH, x);
  const isDisappearing = -WIDTH * 0.6;
  const isTop = 0;
  const isBottom = WIDTH - CARD_WIDTH;
  const isAppearing = WIDTH;
  const translateX = Animated.add(Animated.add(x, x.interpolate({
    inputRange: [0, 0.00001 + index * CARD_WIDTH],
    outputRange: [0, -index * CARD_WIDTH],
    extrapolateRight: 'clamp',
  })),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -WIDTH * 0.6 / 4],
      extrapolate: 'clamp'
    }));
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View style={[
      itemStyles.cardWrapper,
      {
        opacity,
        transform: [
          { translateX },
          { scale }
        ]
      }]}>
      <View style={itemStyles.card}>
        <Text>{item.title}</Text>
        <Text>{item.channel}</Text>
      </View>
    </Animated.View>
  );
};