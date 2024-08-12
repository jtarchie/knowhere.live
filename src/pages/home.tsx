function HomePage({}: { path?: string }) {
  return (
    <div class="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen text-gray-800">
      <nav class="flex justify-between items-center mb-8">
        <a href="/" class="text-white text-2xl font-bold">Knowhere to Live</a>
        <div>
          <a
            class="btn btn-ghost btn-sm rounded-btn text-white"
            href="/docs"
            data-native
          >
            Docs
          </a>
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
              Find your perfect location by searching Knowhere
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg mb-20 mt-20">
        <h2 class="text-3xl font-bold mb-3">Currently in Beta</h2>
        <p>
          We are excited to announce that Knowhere is currently in an
          invite-only open beta. Our innovative application is designed to help
          you discover geographical areas that perfectly match your real estate
          criteria. Whether it's a home near a school or a business location
          near a highway exit, Knowhere guides you to your ideal destination.
        </p>
      </div>

      <footer class="text-center text-white">
        <p>© {new Date().getFullYear()} Knowhere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export { HomePage };
