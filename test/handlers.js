const { CommonHandlers } = require('../common/main/handlers');

class Handlers extends CommonHandlers {
    constructor(page, config, administrativeRepository) {
        super()
        this.page = page;
        this.config = config;
        this.administrative = administrativeRepository;
    };

    WrapHandlers = async () => {
        let result = await this.page.evaluate(this.featureGet, this.setupElementFeature())

        result = await this.getThroughOneByOne(result)

        await this.administrative.createMultipleNews(result)
    }
    getThroughOneByOne = async (resultArticles) => {
        if (!Array.isArray(resultArticles)) {
            return null
        }

        for await (const news of resultArticles) {
            try {
                await this.page.goto(news.link, { waitUntil: 'networkidle2' })
                // news.content = await this.page.evaluate(async () => {
                //     document.querySelectorAll('div[itemprop=articleBody] script')?.forEach(el => el.remove())
                //     document.querySelectorAll('div[itemprop=articleBody] style')?.forEach(el => el.remove())
                //     return Array.from(document.querySelectorAll('div[itemprop=articleBody] p')).map((item) => item.textContent).join(' ');
                // })

            } catch (e) {
                console.log(e);
                console.log('> ERROR! cannot proceed : ', news.title)
            }
        }
        return resultArticles
    }


    featureGet = async (element) => {
        return Array.from(document.querySelectorAll(element.id)).map((elementChild) => {
            return {
                title: elementChild.querySelector(element.title)?.textContent,
                subtitle: elementChild.querySelector(element.subtitle)?.textContent,
                categories: elementChild.querySelector(element.categories)?.textContent,
                created_time: elementChild.querySelector(element.created_time)?.textContent,
                link: elementChild.querySelector(element.link)?.href,
            }
        }).filter((article) => article.title && article.link)
    }

    setupElementFeature = () => {
        return {
            id : "body > div",
            title: "body > div > h1",
            subtitle: "body > div > p:nth-child(2)",
            created_time: null,
            categories: null,
            link: "body > div > p:nth-child(3) > a"
        }
    }
}
exports.Handlers = Handlers;
