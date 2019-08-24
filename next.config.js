module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }
    return config;
  },
  routes: [{ src: "^/static/(.*)", dest: "/static/$1" }]
};
