module.exports = {
  apps: [
    {
      name: 'shradhanjali',
      script: './server.js',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};
