import React from 'react';
import { Briefcase, Users, Calendar } from 'lucide-react';
import Button from '../components/UI/button';
import Card from '../components/UI/card';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect. Collaborate. Create.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find teammates, share ideas, and build amazing projects together — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" to="/projects">
              Explore Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-indigo-600 border-white hover:bg-gray-100"
              to="/events"
            >
              Join an Event
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Campus Connect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover>
              <Briefcase className="text-indigo-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">Find Projects</h3>
              <p className="text-gray-600">
                Discover exciting projects that match your skills and interests
              </p>
            </Card>
            <Card hover>
              <Users className="text-indigo-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">Build Teams</h3>
              <p className="text-gray-600">
                Connect with talented students and form collaborative teams
              </p>
            </Card>
            <Card hover>
              <Calendar className="text-indigo-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3">Join Events</h3>
              <p className="text-gray-600">
                Participate in hackathons, workshops, and networking events
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">500+</div>
              <div className="text-gray-600 mt-2">Active Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">2,000+</div>
              <div className="text-gray-600 mt-2">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">50+</div>
              <div className="text-gray-600 mt-2">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">100+</div>
              <div className="text-gray-600 mt-2">Events</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
