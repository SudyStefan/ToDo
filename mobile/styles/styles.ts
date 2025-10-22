import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressableButton: {
    marginTop:20, 
    padding:10, 
    backgroundColor:"dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addView: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 50,
  },
  pressableText: {
    color: 'white',
  },
});
