require("dotenv").config();

module.exports = {
  development: {
    url: `${process.env.DB_URL}${process.env.SSL_REQUIRE}`,
  },
  test: {
    url: `${process.env.DB_URL}${process.env.SSL_REQUIRE}`,
  },
  production: {
    url: `${process.env.DB_URL}${process.env.SSL_REQUIRE}`,
  },
};
