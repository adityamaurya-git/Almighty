// previous
// export const playNotification = () => {
//     const audio = new Audio("/sounds/notification.wav");

//     audio.play().catch(() => {});
// };




// let notificationAudio = null;

// export const playNotification = () => {
//     if (!notificationAudio) {
//         notificationAudio = new Audio("/sounds/notification.mpeg");
//         notificationAudio.loop = true;
//         notificationAudio.volume = 1;
//     }

//     // Don't restart the sound on every Firestore update.
//     if (notificationAudio.paused) {
//         notificationAudio.currentTime = 0;

//         notificationAudio.play().catch((error) => {
//             console.warn("Could not play notification sound:", error);
//         });
//     }
// };

// export const stopNotification = () => {
//     if (!notificationAudio) return;

//     notificationAudio.pause();
//     notificationAudio.currentTime = 0;
// };


// export const playNotificationOnce = () => {
//     const audio = new Audio("/sounds/notification.mpeg");
//     audio.loop = false;
//     audio.volume = 1;

//     audio.play().catch((error) => {
//         console.warn("One-time notification sound failed:", error);
//     });
// };




let notificationAudio = null;
let audioUnlocked = false;

const getAudio = () => {
    if (!notificationAudio) {
        notificationAudio = new Audio("/sounds/notification.mpeg");
        notificationAudio.loop = true;
        notificationAudio.volume = 1;
        notificationAudio.preload = "auto";
        notificationAudio.load();
    }

    return notificationAudio;
};

// Call this after a vendor clicks or interacts with the PWA.
export const unlockNotificationAudio = async () => {
    const audio = getAudio();

    try {
        audio.muted = true;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;

        audioUnlocked = true;
        return true;
    } catch (error) {
        audio.muted = false;
        console.warn("Could not unlock notification audio:", error);
        return false;
    }
};

// Repeating sound for orders awaiting manual action.
export const playNotification = () => {
    const audio = getAudio();
    audio.loop = true;

    if (audio.paused && audioUnlocked) {
        audio.currentTime = 0;

        audio.play().catch((error) => {
            console.warn("Repeating alert could not play:", error);
        });
    }
};

// One ring for auto-accepted orders.
export const playNotificationOnce = () => {
    const audio = getAudio();
    audio.loop = false;

    if (audioUnlocked) {
        audio.currentTime = 0;

        audio.play().catch((error) => {
            console.warn("One-time alert could not play:", error);
        });
    }
};

// Stop the alert when all orders are handled.
export const stopNotification = () => {
    if (!notificationAudio) return;

    notificationAudio.pause();
    notificationAudio.currentTime = 0;
};

