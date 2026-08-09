import { useEffect, useState } from "react";

const usePreparationTimer = ( acceptedAt, prepTime = 15 ) => {

    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        if (
            !acceptedAt ||
            typeof acceptedAt.toDate !== "function"
        ) {
            return;
        }

        const interval = setInterval(() => {
            const accepted = acceptedAt.toDate();
            const finishTime = new Date(
                accepted.getTime() + prepTime * 60 * 1000
            );

            const diff = Math.max(
                0,
                finishTime.getTime() - Date.now()
            );

            setRemaining(diff);
        }, 1000);

        return () => clearInterval(interval);

    }, [ acceptedAt, prepTime ]);

    return {
        remaining,
        isFinished: remaining === 0,
        minutes:
            Math.floor(remaining / 60000),
        seconds:
            Math.floor(
                (remaining % 60000) / 1000
            )
    };

};

export default usePreparationTimer;