const util = require('./util');

(async () => {
    const page = await util.login()
    while (true) {
        try {
            await util.cheat(page, 520)
        } catch (e) {
            console.log(e)
        }
    }
})();
