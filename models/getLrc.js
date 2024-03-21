import puppeteer from "puppeteer";

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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const listItems = await page.$$eval(
        ".entity_full_member_info .entity_full_member_name div[class='pro_part mid']",
        (items) => {
          return items.map((el) => {
            return {
              title: el.querySelector("a").getAttribute("name"),
              link: `https://www.megalobiz.com${el
                .querySelector("a")
                .getAttribute("href")}`,
            };
          });
        }
      );
      await browser.close();
      return listItems.slice(0, 1);
    } catch (e) {
      return { error: e.message };
    }
  }
};

const getLRc = async (newUrl) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(newUrl);
    const title = await page.$eval(".profile_h1", (el) => el.textContent);
    const lrc = await page.$eval(
      ".lyrics_details.entity_more_info > span",
      (el) => el.textContent
    );
    await browser.close();
    return { title: title.trim(), lyrics: lrc.trim() };
  } catch (e) {
    return { error: e.message };
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
