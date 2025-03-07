import pug from "pug";
import fs from "node:fs";

// compile static homepage
const compiled = pug.compileFile("src/views/index.pug");

fs.writeFile("public/index.html", compiled(), (err) => {
  if (err) {
    console.error("Failed to compile homepage: ", err);
    throw err;
  }

  console.log('Succesfully compile homepage to "public/index.html"');
});
