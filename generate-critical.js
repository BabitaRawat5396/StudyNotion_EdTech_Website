import critical from "critical";

critical
  .generate({
    base: "build/",
    src: "index.html",
    target: {
      html: "index.html",
    },
    inline: true,
    dimensions: [
      {
        width: 1300, // desktop
        height: 900,
      },
      {
        width: 375, // mobile
        height: 667,
      },
    ],
    minify: true,
    extract: false,
  })
  .then(() => {
    console.log("✅ Critical CSS inlined successfully!");
  });
