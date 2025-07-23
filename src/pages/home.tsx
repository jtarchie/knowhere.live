import { useEffect } from "preact/hooks";

function HomePage({}: { path?: string }) {
  useEffect(() => {
    document.title = "Knowhere";
  }, []);

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav class="bg-white shadow-sm border-b border-slate-200">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="text-slate-800 text-2xl font-bold">
              Knowhere
            </a>
            <div class="space-x-4">
              <a
                class="text-slate-600 hover:text-slate-800 transition-colors"
                href="/docs"
                data-native
              >
                Documentation
              </a>
              <a
                class="text-slate-600 hover:text-slate-800 transition-colors"
                href="mailto:hello@knowhere.live"
              >
                Contact
              </a>
              <a
                href="/beta/demo/search"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Beta
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="container mx-auto px-6 py-20 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Location Intelligence
            <span class="block text-blue-600">Made Simple</span>
          </h1>
          <p class="text-xl text-slate-600 mb-8 leading-relaxed">
            Discover the perfect location for your needs with our powerful
            geospatial search platform. From finding neighborhoods that match
            your lifestyle to discovering nearby amenities, Knowhere transforms
            complex location data into actionable insights.
          </p>
          <div class="flex justify-center space-x-4">
            <a
              href="/beta/demo/search"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Exploring
            </a>
            <a
              href="/docs"
              data-native
              class="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section class="bg-white py-16">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-slate-800 mb-6">
              Built for Real Estate, Urban Planning & Location Research
            </h2>
            <p class="text-lg text-slate-600 leading-relaxed">
              Knowhere is a comprehensive location intelligence platform that
              combines OpenStreetMap data with advanced search capabilities.
              Whether you're a real estate professional looking for properties
              near specific amenities, an urban planner analyzing neighborhood
              characteristics, or someone searching for the perfect place to
              call home, our tools provide the insights you need to make
              informed location-based decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-16">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-slate-800 mb-4">
              Powerful Location Search Tools
            </h2>
            <p class="text-lg text-slate-600">
              Three specialized tools to help you find exactly what you're
              looking for
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Demo Tool */}
            <div class="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div class="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-4">
                Place Search
              </h3>
              <p class="text-slate-600 mb-6">
                Search for specific places by keyword within any geographic
                area. Perfect for finding all locations of a particular business
                or amenity type.
              </p>
              <a
                href="/beta/demo/search"
                class="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                Try Place Search
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Nearby Tool */}
            <div class="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-4">
                Nearby Discovery
              </h3>
              <p class="text-slate-600 mb-6">
                Discover what's around any address. Schools, restaurants,
                healthcare, transportation, and 12+ other categories of
                amenities within your specified radius.
              </p>
              <a
                href="/beta/nearby/search"
                class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Explore Nearby
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Neighborhood Tool */}
            <div class="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-4">
                Smart Neighborhoods
              </h3>
              <p class="text-slate-600 mb-6">
                Describe your ideal neighborhood in natural language. Our
                AI-powered search understands your preferences and finds
                matching locations.
              </p>
              <a
                href="/beta/neighborhood/search"
                class="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Find Neighborhoods
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice */}
      <section class="bg-slate-800 py-16">
        <div class="container mx-auto px-6 text-center">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-white mb-4">
              Currently in Open Beta
            </h2>
            <p class="text-xl text-slate-300 mb-8">
              Join thousands of users already discovering the power of location
              intelligence. Our platform is free during the beta period as we
              continue to refine and enhance the experience based on your
              feedback.
            </p>
            <a
              href="/beta/demo/search"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-white border-t border-slate-200 py-8">
        <div class="container mx-auto px-6 text-center">
          <p class="text-slate-600">
            © {new Date().getFullYear()} Knowhere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export { HomePage };
