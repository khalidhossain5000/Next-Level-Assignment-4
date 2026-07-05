import app from "./app";
import configuration from "./config";

const port = configuration.port;

const main = async () => {
  try {
    app.listen(port, () => {
      console.log(
        `Next Level Assignment 4 and Rent Rest Is Running On Port ${port}`,
      );
    });
  } catch (error) {
    console.log(error, "error while server running");
    process.exit(1);
  }
};

main();
