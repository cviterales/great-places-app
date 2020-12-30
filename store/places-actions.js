import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.3
      );
    } catch (error) {
      throw error;
    }

    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insertId, title: title, image: newPath },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({type: SET_PLACE, places: dbResult.rows._array})
    } catch (error) {
      throw error;
    }
  };
};
