module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9f5053fc5f4257fa21f4b1cb5b3f05ce'),
  },
});
