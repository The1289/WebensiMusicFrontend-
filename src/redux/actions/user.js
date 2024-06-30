import axios from "axios";
import { server } from "../../server";


// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });   

  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return a message to be displayed on the screen
    return 'Failed to load user data. Please check your internet connection or try again later.';
  }
};

