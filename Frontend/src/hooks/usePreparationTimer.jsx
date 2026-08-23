// import { useEffect, useState } from "react";

// const usePreparationTimer = (acceptedAt, prepTime = 15) => {

//     const [remaining, setRemaining] = useState(null);

//     useEffect(() => {
//         if (
//             !acceptedAt ||
//             typeof acceptedAt.toDate !== "function"
//         ) {
//             return;
//         }

//         const interval = setInterval(() => {
//             const accepted = acceptedAt.toDate();
//             const finishTime = new Date(
//                 accepted.getTime() + prepTime * 60 * 1000
//             );

//             const diff = Math.max(
//                 0,
//                 finishTime.getTime() - Date.now()
//             );

//             setRemaining(diff);
//         }, 1000);

//         return () => clearInterval(interval);

//     }, [acceptedAt, prepTime]);

//     return {
//         remaining,
//         isFinished: remaining !== null && remaining === 0,
//         minutes: remaining === null ? 15 : Math.floor(remaining / 60000),
//         seconds: remaining === null ? 0 : Math.floor((remaining % 60000) / 1000)
//     };

// };

// export default usePreparationTimer;
















import { useEffect, useState } from "react";

const usePreparationTimer = (acceptedAt, prepTime = 15) => {

    const [remaining, setRemaining] = useState(null);

    useEffect(() => {

        if (
            !acceptedAt ||
            typeof acceptedAt.toDate !== "function"
        ) {
            setRemaining(null);
            return;
        }

        const acceptedTime = acceptedAt.toDate().getTime();

        const preparationTime =
            Number(prepTime || 15) * 60 * 1000;

        const finishTime =
            acceptedTime + preparationTime;

        const updateTimer = () => {

            const diff = Math.max(
                0,
                finishTime - Date.now()
            );

            setRemaining(diff);
        };

        // Run immediately.
        updateTimer();

        const interval = setInterval(
            updateTimer,
            1000
        );

        return () => {
            clearInterval(interval);
        };

    }, [acceptedAt, prepTime]);

    const isFinished =
        remaining !== null &&
        remaining <= 0;

    return {

        remaining,

        isFinished,

        minutes:
            remaining === null
                ? 0
                : Math.floor(
                    remaining / 60000
                ),

        seconds:
            remaining === null
                ? 0
                : Math.floor(
                    (remaining % 60000) / 1000
                )
    };
};

export default usePreparationTimer;