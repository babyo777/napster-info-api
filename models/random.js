import megalobiz from "megalobiz-lrc-scraper";

async function getLRCCheck(query) {
  const res = await megalobiz.searchLRC({
    query: query,
  });

  return { res: res };
}

export { getLRCCheck };
