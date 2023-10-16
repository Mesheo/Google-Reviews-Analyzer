module.exports = async function closeBroswer(browser) {
    console.log("[CLOSEBROWSER] - Closing pages and the entire browser")
    const pages = await browser.pages();
    for (let i = 0; i < pages.length; i++) {
        await pages[i].close();
    }
    await browser.close()
}
