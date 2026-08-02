export const playNotification = () => {
    const audio = new Audio("/sounds/notification.wav");

    audio.play().catch(() => {});
};