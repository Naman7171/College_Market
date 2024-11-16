import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Home as HomeIcon, Calendar, MessageSquare } from 'lucide-react';

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to CollegeMarket
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your one-stop platform for college community commerce and connections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<ShoppingBag className="w-8 h-8" />}
          title="Marketplace"
          description="Buy and sell items within your college community"
          link="/marketplace"
        />
        <FeatureCard
          icon={<HomeIcon className="w-8 h-8" />}
          title="Housing"
          description="Find and list student housing opportunities"
          link="/housing"
        />
        <FeatureCard
          icon={<Calendar className="w-8 h-8" />}
          title="Events"
          description="Discover and share campus events"
          link="/events"
        />
        <FeatureCard
          icon={<MessageSquare className="w-8 h-8" />}
          title="Forum"
          description="Connect and discuss with your college community"
          link="/forum"
        />
      </div>

      <div className="mt-20 bg-indigo-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder listings */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1434030216411-0b793f4b4173' : i === 2 ? '1434494878150-c97c9f6cadb1' : '1434493907317-a8e3b3c6b506'}?auto=format&fit=crop&w=400&q=80`}
                  alt="Listing"
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <h3 className="font-semibold mb-2">Sample Listing {i}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">$XX.XX</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) => (
  <Link to={link} className="block">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-indigo-600 dark:text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </Link>
);