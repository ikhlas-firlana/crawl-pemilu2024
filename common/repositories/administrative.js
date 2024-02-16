class Administrative {
    constructor({model}) {
        this.model = model
    }
    createNews = async (params) => {
        if (typeof params !== 'object')
            return null;

        await this.model.findOrCreate({
          where: { url: params['url'], name: params['name'] },
          defaults: {
            name: params['name'],
            url: params['url'],
            info: params['info'] ? params['info'] : null,
            progress: params['progress'] ? params['progress'] : null,
            candidate_1: params['candidate_1'] ? params['candidate_1'] : null,
            candidate_2: params['candidate_2'] ? params['candidate_2'] : null,
            candidate_3: params['candidate_3'] ? params['candidate_3'] : null,
          }
        });
    }
    createMultipleNews = async (params) => {
        if (!Array.isArray(params))
            return null;

        for await (const param of params) {
            await this.createNews(param)
        }
    }
}
exports.Administrative = Administrative
