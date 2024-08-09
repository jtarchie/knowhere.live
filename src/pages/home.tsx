function HomePage({}: { path?: string }) {
  return (
    <div class="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen text-gray-800">
      <nav class="flex justify-between items-center mb-8">
        <a href="/" class="text-white text-2xl font-bold">Knowhere</a>
        <div>
          <button class="btn btn-ghost btn-sm rounded-btn text-white line-through">
            Features
          </button>
          <button class="btn btn-ghost btn-sm rounded-btn text-white line-through">
            Pricing
          </button>
          <a
            class="btn btn-ghost btn-sm rounded-btn text-white"
            href="mailto:hello@knowhere.live"
          >
            Contact
          </a>
        </div>
      </nav>
      <div
        class="hero bg-base-200"
        style="background-image: url(/images/hero.webp);"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold text-white mb-4">
              Discover Your Ideal Location
            </h1>
            <p class="text-xl font-semibold text-gray-200 mb-6">
              Find your perfect location based on your criteria with Knowhere
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 mt-20">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold mb-3">What We Are Building</h2>
          <p>
            An innovative application designed to help you discover geographical
            areas that perfectly match your real estate criteria. Whether it's a
            home near a school or a business location near a highway exit,
            Knowhere guides you to your ideal destination.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold mb-3">Why We Are Building It</h2>
          <p>
            To simplify the process of finding the perfect location. We empower
            our users with knowledge and tools to find places that meet their
            specific needs and preferences, turning the concept of "knowing
            where you want to be" into reality.
          </p>
        </div>
      </div>
      <footer class="text-center text-white">
        <p>© 2024 Knowhere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export { HomePage };
