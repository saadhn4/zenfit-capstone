const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold text-blue-400">
        Welcome to ZenFit Gym
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Track your fitness and memberships easily.
      </p>
      <div className="mt-6 space-x-4">
        <a
          href="/login"
          className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Home;
