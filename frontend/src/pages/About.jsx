import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-300 min-h-screen py-10 px-4  mt-16 lg:mt-20 ">
      <div className="max-w-4xl mx-auto rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About StayFinder</h1>

        <p className="text-gray-700 mb-6">
          <strong>StayFinder</strong> is a trusted platform for finding and hosting rooms for rent. Whether you're a traveler searching for a temporary place or a homeowner looking to earn extra income, StayFinder connects people safely and easily.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            We’re committed to making room rentals simple, accessible, and secure for everyone. StayFinder empowers users with flexible options, fair pricing, and a supportive community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>🔍 Search for rental rooms based on location, price, and amenities.</li>
            <li>🏠 Host your space and manage your listing with ease.</li>
            <li>🔐 Safe communication between hosts and renters.</li>
            <li>📅 Flexible booking for short-term and long-term stays.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Renters:</strong> Browse listings, check availability, and book your stay in a few steps.</li>
            <li><strong>Hosts:</strong> Create a listing, set your preferences, and start earning from your space.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Join Our Community</h2>
          <p className="text-gray-700">
            Whether you're looking for a room or offering one, StayFinder helps you connect with the right people. Join now and be part of a growing network of trusted hosts and happy guests!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
