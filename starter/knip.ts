import compile from "@mdx-js/mdx"; // Use v1

export default {
  compilers: {
    astro: (text: string) => [...text.matchAll(/import[^;]+/g)].join("\n"),
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n"),
    mdx: (text: string) => compile(text),
  },
  entry: ["src/pages/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,astro}"],
  project: [
    "src/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,astro}",
    "test/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,astro}",
  ],
};
