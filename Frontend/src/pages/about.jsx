import React from "react";
import {
  ShoppingCart,
  UtensilsCrossed,
  Pill,
  Smartphone,
  Clock3,
  Store,
  Truck,
  ShieldCheck,
  Target,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: UtensilsCrossed,
    title: "Food",
    description: "Fresh meals from your favourite restaurants.",
  },
  {
    icon: ShoppingCart,
    title: "Groceries",
    description: "Daily essentials from trusted local supermarkets.",
  },
  {
    icon: Pill,
    title: "Medicines",
    description: "Health essentials delivered safely and quickly.",
  },
  {
    icon: Smartphone,
    title: "Electronics",
    description: "Mobile accessories, gadgets and everyday electronics.",
  },
];

const features = [
  {
    icon: Store,
    title: "Offline Store Prices",
    description:
      "Enjoy the same prices offered by local stores with complete transparency.",
  },
  {
    icon: Clock3,
    title: "Fast Delivery",
    description:
      "Get your essentials delivered to your doorstep in minutes.",
  },
  {
    icon: Truck,
    title: "Trusted Local Stores",
    description:
      "Every order is fulfilled by verified stores in your neighbourhood.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Safe payments, genuine products, and reliable customer support.",
  },
];

export const About = () => {
  return (
    <div className="">

      {/* Hero */}
      <section className=" border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-partner-primary-bg-color text-sm">
            About ALMIGHTY
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
            Everything You Need,
            <br />
            <span className="text-partner-primary-bg-color">
              Delivered in Minutes.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8">
            ALMIGHTY is a quick commerce platform that brings together your
            favourite local stores on one app. From groceries and food to
            medicines and electronics, we deliver everything you need at the
            same prices you'd find in offline stores.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-partner-primary-bg-color px-7 py-4 font-semibold hover:bg-red-700 transition">
              Start Shopping
            </button>

            <Link to="/almighty/policies" className="rounded-xl border border-neutral-700 px-7 py-4 hover:border-red-500 transition">
              Learn More
            </Link>
          </div>

        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl font-bold">
            Our Story
          </h2>

          <p className="mt-8 leading-8">
            Shopping locally has always been affordable and trustworthy, but it
            often takes time. Online shopping is convenient, but prices can be
            higher than what you'd pay in-store.
          </p>

          <p className="mt-6 leading-8">
            ALMIGHTY bridges that gap by connecting customers with nearby local
            stores, allowing them to shop at offline prices while enjoying the
            convenience of fast doorstep delivery.
          </p>

          <p className="mt-6 leading-8">
            We believe local businesses are the backbone of every community.
            That's why every order placed on ALMIGHTY supports neighbourhood
            stores while giving customers a seamless shopping experience.
          </p>

        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-10">

          <div className="grid grid-cols-2 gap-8">

            <div>
              <h3 className="text-5xl font-bold text-partner-primary-bg-color">100%</h3>
              <p className="mt-3">
                Transparent Pricing
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-partner-primary-bg-color">Fast</h3>
              <p className="mt-3">
                Quick Deliveries
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-partner-primary-bg-color">Local</h3>
              <p className="mt-3">
                Verified Stores
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-partner-primary-bg-color">24/7</h3>
              <p className="mt-3">
                Customer Support
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className=" border-neutral-800">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <h2 className="text-4xl font-bold text-center">
            What We Deliver
          </h2>

          <p className="mt-5 text-center max-w-2xl mx-auto">
            Everything you need from trusted stores around you.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 hover:border-red-500 transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center  justify-center">
                    <Icon className="text-partner-primary-bg-color" size={28} />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-partner-text-color">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-primary-text-color">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold text-center">
          Why Choose ALMIGHTY?
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-neutral-800 p-8 hover:border-red-500 transition"
              >
                <Icon className="text-partner-primary-bg-color" size={38} />

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* Mission */}

      <section className="">

        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">

          <div className="rounded-3xl border border-neutral-800 p-10">

            <Target className="text-partner-primary-bg-color" size={42} />

            <h2 className="mt-6 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-6 leading-8">
              To make everyday shopping faster, simpler, and more affordable by
              connecting customers with trusted local stores while maintaining
              offline pricing.
            </p>

          </div>

          <div className="rounded-3xl border border-neutral-800 p-10">

            <Eye className="text-partner-primary-bg-color" size={42} />

            <h2 className="mt-6 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-6 leading-8">
              To become India's most trusted quick commerce platform by
              empowering local businesses and delivering exceptional customer
              experiences every day.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section>

        <div className="max-w-5xl mx-auto px-6 py-24 text-center">

          <h2 className="text-5xl font-bold">
            Experience Smarter Shopping
          </h2>

          <p className="mt-6 text-lg leading-8">
            Shop from your favourite nearby stores, pay offline prices, and
            receive everything you need delivered quickly to your doorstep.
          </p>

          <Link to="/" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 transition">
            Explore ALMIGHTY
            <ArrowRight size={20} />
          </Link>

        </div>

      </section>

    </div>
  );
}