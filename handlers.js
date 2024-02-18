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
            console.log('>>>>> childHandler', e);
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

    childVoterHandler = async (url) => {
        const page = await this.browser.newPage();
        try {
            await page.goto(url)

            await page.waitForNetworkIdle();

            const result = await page.evaluate(this.featureGetVoter, this.setupVoterElementFeature())

            console.log(result);

            await this.administrative.createVote(result)

        } catch (e) {
            console.log('>>>>> childVoterHandler', e);
        }
        await page.close()
    }

    handlerVoter = async (level) => {
        const list = await this.administrative.findAll({ where: { level } })
        this.levelCounter = level + 1;

        for await (const param of list) {

            this.parentCounter = param.dataValues.id;
            const url = param.dataValues.url;

            console.log(param.dataValues);

            await this.childVoterHandler(url);
        }
    }

    WrapHandlers = async () => {

        await this.mainHandler()

        // await this.handlerByLevel(1)
        //
        // await this.handlerByLevel(2)
        //
        // await this.handlerByLevel(3)
        //
        // await this.handlerByLevel(4)

        await this.handlerByLevel(5)

        // await this.handlerVoter(5)
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

    featureGetVoter = (element) => {
        const info = document.querySelector(element.info)?.textContent;

        const elementChild = document.querySelectorAll(element.id);

        return {
            info,
            level: element.level,
            parent: element.parent,

            total_dpt: elementChild[0].querySelector(element.total_dpt)?.textContent,
            total_dptb: elementChild[1].querySelector(element.total_dptb)?.textContent,
            total_dpk: elementChild[2].querySelector(element.total_dpk)?.textContent,
            total_dpt_dptb_dpk: elementChild[3].querySelector(element.total_dpt_dptb_dpk)?.textContent,

            candidate_1: elementChild[4].querySelector(element.candidate_1)?.textContent,
            candidate_2: elementChild[5].querySelector(element.candidate_2)?.textContent,
            candidate_3: elementChild[6].querySelector(element.candidate_3)?.textContent,

            total_valid: elementChild[7].querySelector(element.total_valid)?.textContent,
            total_invalid: elementChild[8].querySelector(element.total_invalid)?.textContent,
            total_valid_invalid: elementChild[9].querySelector(element.total_valid_invalid)?.textContent,

        }
    }

    setupVoterElementFeature = () => {
        return {
            info: "#main > div.container > div.card > div.card-body > div > div > .version-progress",
            id: ".table > tbody > tr",
            level: this.levelCounter,
            parent: this.parentCounter,

            total_dpt: "td:nth-child(2)",
            total_dptb: "td:nth-child(2)",
            total_dpk: "td:nth-child(2)",
            total_dpt_dptb_dpk: "td:nth-child(2)",

            candidate_1: "td:nth-child(3)",
            candidate_2: "td:nth-child(3)",
            candidate_3: "td:nth-child(3)",

            total_valid: "td:nth-child(3)",
            total_invalid: "td:nth-child(3)",
            total_valid_invalid: "td:nth-child(3)",
        }
    }

}
module.exports = {
    Handlers,
};
