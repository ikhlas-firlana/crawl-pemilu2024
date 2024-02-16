const { CommonHandlers } = require('./common/main/handlers')

class Handlers extends CommonHandlers {
    constructor(page, config, administrativeRepository) {
        super()
        this.page = page;
        this.config = config;
        this.administrative = administrativeRepository;
    };

    WrapHandlers = async () => {

        const result = await this.page.evaluate(this.featureGet, this.setupElementFeature())

        await this.administrative.createMultipleNews(result)
    }

    featureGet = async (element) => {
        const info = document.querySelector(element.info)?.textContent;

        return Array.from(document.querySelectorAll(element.id)).map((elementChild) => {
            return {
                info,
                name: elementChild.querySelector(element.name)?.textContent,
                url: elementChild.querySelector(element.url)?.href,
                progress: elementChild.querySelector(element.progress)?.textContent,
                candidate_1: elementChild.querySelectorAll(element.candidate_1)[1]?.textContent,
                candidate_2: elementChild.querySelectorAll(element.candidate_2)[2]?.textContent,
                candidate_3: elementChild.querySelectorAll(element.candidate_3)[3]?.textContent,
            }
        }).filter((article) => article.title && article.link)
    }

    setupElementFeature = () => {
        return {
            info: "#main > div.container > div > div.card-body > div.text-center.p-2.version-progress > div",
            id: ".table.table-hover.table-bordered.fs-12 > tbody > tr",
            name: "td > a",
            url: "td > a",
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
