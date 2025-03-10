import pug from "pug";
import fs from "node:fs";

const templates = [
  { src: "src/views/static/index.pug", dest: "public/index.html" },
  { src: "src/views/static/about.pug", dest: "public/about.html" },
  { src: "src/views/static/terms.pug", dest: "public/terms.html" },
  { src: "src/views/static/privacy.pug", dest: "public/privacy.html" },
  { src: "src/views/static/impressum.pug", dest: "public/impressum.html" },
];

templates.forEach((template) => {
  const compiled = pug.compileFile(template.src);

  fs.writeFile(template.dest, compiled(), (err) => {
    if (err) {
      console.error(`Failed to compile ${template.src}: `, err);
      throw err;
    }

    console.log(`Succesfully compiled ${template.src} to ${template.dest}`);
  });
});
