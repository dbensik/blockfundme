module.exports = {
  webpack: (config, { buildId, dev }) => {
    // This allows the app to refer to files through the symlink
    config.resolve.symlinks = false
    return config
  }
}
