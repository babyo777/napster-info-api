import axios from "axios";
import * as cheerio from "cheerio";

const searchLRC = async (query) => {
  if (
    (typeof query.query === "string" &&
      query.query.length !== 0 &&
      query.hasOwnProperty("query")) === false
  ) {
    return { error: `[query] is a mandatory field and must always a string.` };
  } else {
    const q = query.query.replace(/ /gi, "+");
    const url = `https://www.megalobiz.com/search/all?qry=${q}`;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const listItems = $(
        ".entity_full_member_info .entity_full_member_name div[class='pro_part mid']"
      );
      let Q = [];
      listItems.each((idx, el) => {
        if (Q.length == 1) return;
        let E = {};
        E.title = $(el).children("a").attr("name");
        E.link = `https://www.megalobiz.com${$(el).children("a").attr("href")}`;
        /*
                //total time obj. is currently available
                i = $(el).children("a").attr("title").split(" ")
                E.totalTime = i[i.length-1]
                */
        Q.push(E);
      });
      return Q;
    } catch (e) {
      return { error: "[ERR] Something Unexpected Happen!" };
    }
  }
};

const getLRc = async (newUrl) => {
  try {
    let { data } = await axios.get(newUrl);
    const $ = cheerio.load(data);
    const lrc = $("[class='lyrics_details entity_more_info']")
      .children("span")
      .text();
    const title = $(".profile_h1").text();
    return { title: title, lyrics: lrc };
  } catch (e) {
    return { error: "[ERR] Something Unexpected Happen!" };
  }
};

async function getLRC(query) {
  const res = await searchLRC({
    query: query,
  });
  const res2 = await getLRc(res[0].link);

  return res2;
}

export { getLRC };
