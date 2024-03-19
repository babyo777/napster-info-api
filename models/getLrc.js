import megalobiz from "megalobiz-lrc-scraper";

async function getLRC(query) {
  const res = await megalobiz.searchLRC({
    query: query,
  });
  const res2 = await megalobiz.getLRC(res[2].link);

  if (res2.title.includes(query)) return [];
  return res2;
}

export { getLRC };
