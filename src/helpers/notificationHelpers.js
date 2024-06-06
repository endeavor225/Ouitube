
export const emitNotification = (dispatch, message, type, status="success", timeout=200) => {
    let notification = {
        _id : (Math.random()*415356).toString(),
        message,
        status
      }
      dispatch({
        type,
        payload: notification
      })
}