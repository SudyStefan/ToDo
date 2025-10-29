import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const colors = {
  primaryLight: 'rgb(236, 230, 214)', //eggshell
  secondaryLight: 'rgb(255, 255, 255)',
  secondaryDark: 'rgb(11,15,18)', //soft black
  primaryDark: 'rgb(42, 52, 57)', //gunmetal
  transparent: 'rgba(0,0,0,0)',
  soxred: 'rgb(189, 48, 57)', //color of the boston red sox
  dodgerblue: 'dodgerblue', //color of the la dodgers
  seattlegreen: 'rgb(0, 122, 51)', //color of the seattle mariners
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  item: {
    backgroundColor: colors.transparent,
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.010,
    borderBottomWidth: 1,
    borderColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: height * 0.025,
    color: colors.primaryLight,
    maxWidth: '75%',
  },
  pressableButton: {
    flex: 1,
    marginTop: height * 0.02,
    padding: width * 0.03,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: colors.dodgerblue,
  },   
  roundPressableButton: {
    backgroundColor: colors.dodgerblue,
    borderRadius: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.2,
    height: width * 0.2,
  },
  roundPressableButtonText: {
    color: colors.primaryLight,
    fontSize: height * 0.05,
    textAlign: 'center',
  },
  deleteContainer: {
    flex: 1,
    backgroundColor: colors.soxred,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.05,
  },
  deleteText: {
    color: colors.primaryLight,
    fontWeight: 'bold',
  },
  addView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  defaultText: {
    color: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: height * 0.025,
  },
  todoList: {
    flex: 1,
    marginHorizontal: width * 0.07,
    marginTop: height * 0.05,
    justifyContent: 'flex-start',
  },
  tabBar: {
    backgroundColor: '#111', 
    height: "10%",
    justifyContent: 'flex-start',
  },
  fullScreenView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  undoView: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: height * 0.3,
    justifyContent: 'center'
  },
  undoList: {
    marginHorizontal: width * 0.07,
    backgroundColor: 'rgba(100, 100, 100, 1)',
    borderRadius: width * 0.03,
  },
});
