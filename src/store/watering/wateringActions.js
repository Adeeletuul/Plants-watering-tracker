import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc
} from "@firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";

// Action types
export const CREATE = "wateringLogs/create";
export const READ = "wateringLogs/read";
export const DELETE = "wateringLogs/delete";

// Action Creators
export const createWateringLog = (wateringLog) => async (dispatch) => {
  try {
    await addDoc(collection(firestore, "wateringLogs"), wateringLog);
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: CREATE,
  });
};

export const readWateringLogs = () => async (dispatch) => {
  const wateringLogsSnapshot = await getDocs(
    collection(firestore, "wateringLogs")
  );
  const wateringLogsList = wateringLogsSnapshot.docs.map((doc) => {
    const wateringLogsData = doc.data();

    return {
      ...wateringLogsData,
      id: doc.id,
    };
  });
  dispatch({
    type: READ,
    payload: { wateringLogs: wateringLogsList },
  });
};

export const deleteWateringLog = (wateringLog) => async (dispatch) => {
  try {
    await deleteDoc(doc(firestore, "wateringLogs", wateringLog.id));
    dispatch({
      type: DELETE,
      payload: wateringLog.id,
    });
  } catch (error) {
    console.log(error);
  }
};
