import megalobiz from "megalobiz-lrc-scraper";

async function getLRCCheck(query) {
  const res = await megalobiz.searchLRC({
    query: query,
  });

  const res2 = await megalobiz.getLRC(res[0].link);
  return { res: res, res2: res2 };
}

export { getLRCCheck };
