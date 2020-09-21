const notificationReducer = (state = null, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state
  };
};

export const setNotification = (message, timeInSeconds) => {
  return async dispatch => {
    const timeInMiliseconds = timeInSeconds * 1000;
    
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, timeInMiliseconds);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timeoutId }
    });

  };
  
};

export default notificationReducer;