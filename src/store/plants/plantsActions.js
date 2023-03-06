import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  limit,
} from "@firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import { storage } from "../../firebase_setup/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { days } from "../../components/watering/Raindrop";
import moment from "moment";

// Action types
export const CREATE = "plants/create";
export const READ = "plants/read";
export const UPDATE = "plants/update";
export const DELETE = "plants/delete";
export const ADDIMAGE = "plants/addImage";
export const DELETEIMAGE = "plants/deleteImage";
export const UPDATEIMAGE = "plants/updateImage";

// Action Creators
export const createPlant =
  (plant, selectedImage = null) =>
  async (dispatch) => {
    try {
      const addedPlant = await addDoc(collection(firestore, "plants"), plant);
      const plantId = addedPlant.id;
      if (selectedImage) {
        await dispatch(uploadImage(selectedImage, plantId));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: CREATE,
    });
    return Promise.resolve();
  };

export const readPlants = () => async (dispatch) => {
  const plantsQuery = query(collection(firestore, "plants"), orderBy("name"));
  const plantsSnapshot = await getDocs(plantsQuery);
  const plants = plantsSnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const wateringRef = collection(firestore, "wateringLogs");
    const imageRef = ref(storage, `/images/${doc.id}`);
    const lastWaterQuery = query(
      wateringRef,
      where("checkedPlants", "array-contains", doc.id),
      orderBy("date", "desc"),
      limit(1)
    );

    const lastWaterQuerySnapshot = await getDocs(lastWaterQuery);
    const lastWater = lastWaterQuerySnapshot.docs[0]?.data();
    const plant = {
      ...data,
      id: doc.id,
      imageUrl: null,
      lastWater: lastWater
        ? lastWater.date.toDate()
        : moment().subtract(days[data.water], "days"),
    };

    try {
      const imageUrl = await getDownloadURL(imageRef);
      plant.imageUrl = imageUrl;
    } catch (err) {
      // console.log(err);
    }

    return Promise.resolve(plant);
  });
  const plantsList = await Promise.all(plants);

  dispatch({
    type: READ,
    payload: { plants: plantsList },
  });
};

export const editPlant = (plant) => async (dispatch) => {
  try {
    await updateDoc(doc(firestore, "plants", plant.id), plant);
    dispatch({
      type: UPDATE,
      payload: plant,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlant = (plant) => async (dispatch) => {
  try {
    await deleteDoc(doc(firestore, "plants", plant.id));
    dispatch({
      type: DELETE,
      payload: plant.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = (image, plantId) => async (dispatch) => {
  const imageRef = ref(storage, `/images/${plantId}`);
  try {
    dispatch({
      type: ADDIMAGE,
    });
    return uploadBytesResumable(imageRef, image).then(() => {
      return Promise.resolve();
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = (plantId) => async (dispatch) => {
  const imageRef = ref(storage, `/images/${plantId}`);
  try {
    dispatch({
      type: DELETEIMAGE,
      payload: plantId,
    });
    deleteObject(imageRef).then(() => {
      return Promise.resolve();
    });
  } catch (error) {
    console.log(error);
  }
};

export const editImage = (plant, selectedImage) => async (dispatch) => {
  try {
    if (selectedImage) {
      await dispatch(uploadImage(selectedImage, plant.id));
      const imageRef = ref(storage, `/images/${plant.id}`);
      const imageUrl = await getDownloadURL(imageRef);
      plant.imageUrl = imageUrl;
    }
    dispatch({
      type: UPDATE,
      payload: plant,
    });
  } catch (error) {
    console.log(error);
  }
};
