import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId }).populate({
            path: "from", select: "username profileImg"
        });
        await Notification.updateMany({ to: userId }, { read: true });
        res.status(200).json(notifications);

    } catch (error) {
        console.log(`Error in getNotification controller : `, error.message);
        res.status(500).json({ error: "Internal Server Error!!" });
    }
}
export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });
        res.status(200).json({ message: "Notifications Deleted Successfully!" });
    } catch (error) {
        console.log(`Error in deleteNotification controller : `, error.message);
        res.status(500).json({ error: "Internal Server Error!!" });
    }
}
export const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);

        if (!notification) res.status(404).json({ message: "Notification Not Found!" });
        if (notification.to.toString() !== userId.toString()) res.status(403).json({ error: "You're not allowed to Delete this notification!" });

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notifications Deleted Successfully!" });
    } catch (error) {
        console.log(`Error in deleteNotification controller : `, error.message);
        res.status(500).json({ error: "Internal Server Error!!" });
    }
}