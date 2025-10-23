import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#333',
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.010,
    borderBottomWidth: 1,
    borderColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressableButton: {
    flex: 1,
    marginTop: height * 0.02,
    padding: width * 0.03,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor:"dodgerblue",
  },   
  pressableText: {
    color: '#aaa',
  }, 
  roundPressableButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.2,
    height: width * 0.2,
  },
  roundPressableButtonText: {
    color: '#aaa',
    fontSize: height * 0.05,
    textAlign: 'center',
  },
  deleteContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.05,
  },
  deleteText: {
    color: 'white',
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
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: height * 0.03,
  },
  todoList: {
    flex: 1,
    marginHorizontal: width * 0.07,
    justifyContent: 'center',
  },
  todoText: {
    fontSize: height * 0.025,
    maxWidth: width * 0.6,
    color: '#eee',
  },
  tabBar: {
    backgroundColor: '#111', 
    height: "10%",
    justifyContent: 'flex-start',
  },
  fullScreenView: {
    flex: 1,
    position: 'absolute',
  }
});
