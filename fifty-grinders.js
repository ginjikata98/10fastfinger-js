const util = require('./util');

(async () => {
    const page = await util.login()
    await page.goto('https://10fastfingers.com/competitions');
    await page.waitForSelector('#join-competition-table')
    const link = await page.$('#join-competition-table tbody tr:last-child .btn-default')
    const href = await page.evaluate(element => element.href, link)
    await page.goto(href)
    while (true) {
        try {
            await util.cheat(page, 700)
        } catch (e) {
            console.log(e)
        }
    }
})();
