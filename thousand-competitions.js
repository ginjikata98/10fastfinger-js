const util = require('./util');

(async () => {
    const page = await util.login()
    await page.goto('https://10fastfingers.com/competitions');
    await page.waitForSelector('#join-competition-table')
    const links = await page.$$eval('#join-competition-table tbody tr td .btn-default', links => links.map(a => a.href))

    let competitionsCount = links.length

    for (let link of links) {
        console.log(`There are ${competitionsCount} links left\n`)
        await page.goto(link)
        while (true) {
            try {
                const done = await util.cheat(page, 700, true)
                if (done) {
                    competitionsCount--
                    break
                }
            } catch (e) {
                console.log(e)
                competitionsCount--
                break
            }
        }

    }

    process.exit(1)

})();
