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
      const res = await axios.get(url + "&searchButton.x=16&searchButton.y=8", {
        responseType: "text",
      });
      return res.data;
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
        Q.push(E);
      });
      return Q;
    } catch (e) {
      return { error: e.message };
    }
  }
};

// const getLRc = async (newUrl) => {
//   try {
//     let { data } = await axios.get(newUrl);
//     const $ = cheerio.load(data);
//     const lrc = $("[class='lyrics_details entity_more_info']")
//       .children("span")
//       .text();
//     const title = $(".profile_h1").text();
//     return { title: title, lyrics: lrc };
//   } catch (e) {
//     return { error: e.message };
//   }
// };

async function getLRC(query) {
  const res = await searchLRC({
    query: query,
  });
  // const res2 = await getLRc(res[0].link);

  return res;
}

export { getLRC };
