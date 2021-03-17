const app = require("./src/app");
const { sequelize } = require("./models");

app.listen(3001, async () => {
  console.log("app is running");
  await sequelize.authenticate();
  console.log("database connected");
});
