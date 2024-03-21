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
      const headers = {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://www.facebook.com",
        Referer:
          "https://www.facebook.com/v2.8/plugins/page.php?app_id=178413309233844&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df9bc2c92424a065e3%26domain%3Dwww.megalobiz.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.megalobiz.com%252Ff2d62d008f732ce7b%26relation%3Dparent.parent&container_width=288&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fmegalobiz&locale=en_US&sdk=joey&show_facepile=true&show_posts=false&width=340px",
        "Sec-Ch-Ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Gpc": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "X-Asbd-Id": "129477",
        "X-Fb-Lsd": "hEgDwwJ3jQ2h1Ha--PWC7t",
      };
      const { data } = await axios.get(url, {
        headers: headers,
      });
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
