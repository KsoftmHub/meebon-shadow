
// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "api_template_ts",
      script: "./dist/index.js",
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      out_file: "./logs/pm2-out.log",
      error_file: "./logs/pm2-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
