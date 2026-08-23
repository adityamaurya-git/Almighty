import React, { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-12-07T00:00:00").getTime();

export const GodsPlan = () => {
  const calculateTimeLeft = () => {
    const difference = LAUNCH_DATE - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-secondary-bg-color text-black flex items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-5xl">

        {/* Main Card */}
        <section className="relative overflow-hidden rounded-lg shadow-2xl bg-white">

          {/* Decorative gradient */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

          <div className="relative px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20 lg:px-20">

            {/* Brand */}
            <div className="flex items-center justify-center mb-14">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold tracking-tight">
                  Almighty
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-center max-w-3xl mx-auto">

              {/* Small Label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-black">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Something special is coming
              </div>

              {/* Heading */}
              <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                GOD's
                <span className=" mx-2 text-primary-bg2-color">
                 Plan
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
                A membership designed to make your everyday
                experience with Almighty even better.
              </p>

              <p className="mt-3 text-sm font-medium text-neutral-900 sm:text-base">
                Coming Soon.
              </p>

              {/* Countdown */}
              <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">

                <TimeBox
                  value={timeLeft.days}
                  label="Days"
                />

                <TimeBox
                  value={timeLeft.hours}
                  label="Hours"
                />

                <TimeBox
                  value={timeLeft.minutes}
                  label="Minutes"
                />

                <TimeBox
                  value={timeLeft.seconds}
                  label="Seconds"
                />

              </div>

              {/* Divider */}
              <div className="my-12 h-px bg-neutral-200" />

              {/* Teaser */}
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Membership
                </p>

                <h2 className="mt-3 text-2xl font-medium sm:text-3xl">
                  More value. More convenience.
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-500 sm:text-base">
                  We're building something special for the
                  people who choose Almighty for their everyday
                  needs.
                </p>
              </div>

              {/* Features */}
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <Feature
                  title="Exclusive Benefits"
                  text="Special advantages designed for members."
                />

                <Feature
                  title="Better Value"
                  text="More value from your everyday orders."
                />

                <Feature
                  title="Member Perks"
                  text="Enjoy something extra, just for being a member."
                />

              </div>

              {/* Bottom CTA */}
              <div className="mt-12">
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white opacity-90"
                >
                  Coming Soon
                </button>

                <p className="mt-4 text-xs text-neutral-400">
                  Stay tuned. GOD's Plan is almost here.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

/* --------------------------------
   Countdown Box
--------------------------------- */

const TimeBox = ({ value, label }) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-2 py-5 sm:px-5 sm:py-6">
      <div className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-400 sm:text-xs">
        {label}
      </div>
    </div>
  );
};

/* --------------------------------
   Feature
--------------------------------- */

const Feature = ({ title, text }) => {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5 text-left transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30">
      <h3 className="text-sm font-semibold text-neutral-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-neutral-500">
        {text}
      </p>
    </div>
  );
};
