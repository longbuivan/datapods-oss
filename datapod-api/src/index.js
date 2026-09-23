const { createApp } = require("./app");

const port = Number(process.env.PORT || 8080);

createApp().listen(port, () => {
  console.log(`datapod-api listening on http://0.0.0.0:${port}`);
});
