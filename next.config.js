module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: { domains: ["firebasestorage.googleapis.com"] },
  optimizeFonts: false,
  env: {
    MONGO_URI:
      "mongodb+srv://marubi:marubi@cluster0.ths4gyi.mongodb.net/?retryWrites=true&w=majority",
  },
};
