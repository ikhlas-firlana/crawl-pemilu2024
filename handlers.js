const { CommonHandlers } = require('./common/main/handlers')

class Handlers extends CommonHandlers {
    levelCounter = 1
    parentCounter = 0

    constructor(page, config, administrativeRepository, browser) {
        super()
        this.page = page;
        this.config = config;
        this.browser = browser;
        this.administrative = administrativeRepository;
    };


    mainHandler = async () => {

        await this.page.waitForNetworkIdle();

        const result = await this.page.evaluate(this.featureGet, this.setupElementFeature())

        await this.administrative.createMultipleNews(result)
    }

    childHandler = async (url) => {
        const page = await this.browser.newPage();
        try {
            await page.goto(url)

            await page.waitForNetworkIdle();

            const result = await page.evaluate(this.featureGet, this.setupElementFeature())

            console.log(result);
            await this.administrative.createMultipleNews(result)

        } catch (e) {
            console.log('>>>>> handler', e);
        }
        await page.close()

    }

    handlerByLevel = async (level) => {
        const list = await this.administrative.findAll({ where: { level } })
        this.levelCounter = level + 1;

        for await (const param of list) {

            this.parentCounter = param.dataValues.id;
            const url = param.dataValues.url;

            console.log(param.dataValues);

            await this.childHandler(url);
        }
    }

    WrapHandlers = async () => {

        await this.mainHandler()

        await this.handlerByLevel(1)

        // await this.handlerByLevel(2)
        //
        // await this.handlerByLevel(3)
    }

    featureGet = (element) => {
        const info = document.querySelector(element.info)?.textContent;

        return Array.from(document.querySelectorAll(element.id)).map((elementChild) => {
            return {
                info,
                name: elementChild.querySelector(element.name)?.textContent,
                url: elementChild.querySelector(element.url)?.href,
                progress: elementChild.querySelector(element.progress)?.textContent,
                level: element.level,
                parent: element.parent,
                candidate_1: elementChild.querySelectorAll(element.candidate_1)[1]?.textContent,
                candidate_2: elementChild.querySelectorAll(element.candidate_2)[2]?.textContent,
                candidate_3: elementChild.querySelectorAll(element.candidate_3)[3]?.textContent,
            }
        })
    }

    setupElementFeature = () => {
        return {
            info: "#main > div.container > div > div.card-body > div.text-center.p-2.version-progress > div",
            id: ".table > tbody > tr",
            name: "td > a",
            url: "td > a",
            level: this.levelCounter,
            parent: this.parentCounter,
            progress: "td > span",
            candidate_1: "td",
            candidate_2: "td",
            candidate_3: "td",
        }
    }
}
module.exports = {
    Handlers,
};
