const puppeteer = require('puppeteer')
require('dotenv').config()

const login = async () => {
    // const browser = await puppeteer.launch({headless: false});
    // await page.setViewport({width: 1200, height: 720})
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://10fastfingers.com/login');
    await page.waitForSelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')

    await page.evaluate(() => {
        document.getElementById('CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click()
    })

    await page.type('#UserEmail', process.env.username)
    await page.type('#UserPassword', process.env.password)
    await page.click('#login-form-submit')

    return page
}

const getText = element => element.textContent

const cheat = async (page, waitTime, autoReset) => {
    await page.waitForSelector('#timer')
    await page.waitForSelector('.highlight')

    const timer = await page.$('#timer')
    const timeText = await page.evaluate(getText, timer);

    if (timeText === '0:00') {
        if (autoReset) return true;
        await page.click('#reload-btn')
    } else {
        const highlight = await page.$('.highlight')
        const text = await page.evaluate(getText, highlight);

        await page.type('#inputfield', text)
        await page.keyboard.press('Space')
    }

    await page.waitForTimeout(waitTime)
}

module.exports = {
    login: login,
    getText: getText,
    cheat: cheat
}
