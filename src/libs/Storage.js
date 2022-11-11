import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

  static instance = new Storage();

  store = async (key, value) => {

    try {

      await AsyncStorage.setItem(key, value);
      // console.log("storage store key", key);
      // console.log("storage store value", value);

      return true;

    } catch(err) {
      console.log("storage store err", err);

      return false;
    }
  }

  get = async (key) => {
    try {

        // console.log("storage get get", key);
        return await AsyncStorage.getItem(key);

    } catch(err) {
      console.log("storage get err", err);

      throw Error(err);

    }
  }

   getJson = async (key) => {
    try {

        // console.log("storage get get", key);
        return await AsyncStorage.getItem(key).then((value) => {
            let dd = JSON.parse(value)
            // console.log("m.email 1" + JSON.stringify(dd.respuesta))
            return dd;
        });

    } catch(err) {
      console.log("storage get err", err);

      throw Error(err);

    }
  }

  multiGet = async (keys) => {
    try {

        // console.log("storage multiGet", keys);

      return await AsyncStorage.multiGet(keys);

    } catch(err) {
      console.log("storage multiGet err", err);

      throw Error(err);
    }
  }

  getAllkeys = async () => {
    try {

        // console.log("storage store getAllkeys");

      return await AsyncStorage.getAllKeys();

    } catch(err) {
      console.log("storage getAllKeys err", err);

      throw Error(err);
    }
  }

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;

    } catch(err) {
      console.log("storage remove err", err);

      return false;
    }
  }

}

export default Storage;