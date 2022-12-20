//https://github.com/sebholstein/astro-google-fonts-optimizer/

const userAgents: { name: string; ua: string }[] = [
  {
    name: "woff",
    ua: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko",
  },
  {
    name: "woff2",
    ua: 'Mozilla/5.0 (Windows NT 6.3; rv:39.0) Gecko/20100101 Firefox/44.0"',
  },
];

export function downloadFontCSS(url: string): Promise<string> {
  const fontDownloads = Promise.all(
    userAgents.map((entry) => {
      return fetch(url, { headers: { "User-Agent": entry.ua } })
        .then((res) => res.text())
        .then((t) =>
          t.replace(/  +/g, "").replace(/\t+/g, "").replace(/\n+/g, "")
        );
    })
  );
  return fontDownloads.then((contents) => contents.join(" "));
}
