import { StyleSheet } from 'react-native';

export const colors = {
  primaryLight: 'rgb(236, 230, 214)', //eggshell
  secondaryLight: 'rgb(255, 255, 255)',
  secondaryDark: 'rgb(11,15,18)', //soft black
  primaryDark: 'rgb(42, 52, 57)', //gunmetal
  transparent: 'rgba(0,0,0,0)',
  soxred: 'rgb(189, 48, 57)', //color of the boston red sox
  dodgerblue: 'dodgerblue', //color of the la dodgers
  seattlegreen: 'rgb(0, 122, 51)', //color of the seattle mariners
  giantsorange: 'rgb(254, 90, 29)', //color of the sf giants
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  item: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 30,
    color: colors.primaryLight,
    maxWidth: '75%',
  },
  pressableButton: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: colors.dodgerblue,
  },   
  roundPressableButton: {
    backgroundColor: colors.dodgerblue,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  swipeContainer: {
    flex: 1,
    backgroundColor: colors.soxred,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 50,
  },
  swipeText: {
    color: colors.primaryLight,
    fontSize: 20,
  },
  addView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 250,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  addText: {
    color: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  singleList: {
    flexGrow: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },
  periodicList: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
  },
  tabBar: {
    backgroundColor: colors.secondaryDark, 
    height: 80,
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
    bottom: 300,
    justifyContent: 'center'
  },
  undoList: {
    flexGrow: 1,
    marginHorizontal: 30, 
  },
  undoItem: {
    borderRadius: 20,
    paddingHorizontal: 10, 
    marginVertical: 3,
    borderBottomWidth: 0, 
    justifyContent: 'space-between',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  floatingPressableView: {
    position: 'absolute',
    bottom: 100,
    flexDirection: "row",
  },
});
