import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./NotificationComponents.css"
import { getNotification } from "../../redux/selectors/selectors"

export default function NotificationComponents() {

    const dispatch = useDispatch()

    const notifications = useSelector(getNotification)

    const runLocalData = async () => {
        notifications.map((notification)=>{
            setTimeout(()=>{
              dispatch({
                type: "REMOVE",
                payload: notification
              })
            }, notification?.timeout || 2000)
        })
    }

    useEffect(() => {
        runLocalData()
    })

    const handleDelete = (notification) => {
        dispatch({
            type: "REMOVE",
            payload: notification
        })
    }
  return (
    <div className="NotificationComponent">
        {notifications.map((notification) => 
            <div key={notification._id} className={`alert alert-${notification.status} alert-dismissible fade show`} role="alert">
                {notification.message}
                <button type="button" onClick={() => handleDelete(notification)} className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
        )}
        
    </div>
  )
}
