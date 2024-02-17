class Administrative {
    constructor({model}) {
        this.model = model
    }
    createNews = async (params) => {
        if (typeof params !== 'object')
            return null;

        const data = {
            name: params['name'],
            url: params['url'],
            parent: params['parent'] ? params['parent'] : 0,
            level: params['level'] ? params['level'] : 0,
            info: params['info'] ? params['info'] : null,
            progress: params['progress'] ? params['progress'] : null,
            candidate_1: params['candidate_1'] ? params['candidate_1'] : null,
            candidate_2: params['candidate_2'] ? params['candidate_2'] : null,
            candidate_3: params['candidate_3'] ? params['candidate_3'] : null,
        }
        const where = { name: params['name'], url: params['url'] }

        const objectData = await this.model.findOne({
          where,
        });

        if (objectData && objectData?.dataValues?.info !== params['info']) {
            const {id} = objectData?.dataValues

            await Promise.all([
                this.model.create({...data}),
                this.model.destroy({
                    where: {
                        id,
                    }
                }),
            ]);
        } else if (!objectData) {
            await this.model.create({...data})
        }
    }
    createMultipleNews = async (params) => {
        if (!Array.isArray(params))
            return null;

        for await (const param of params) {
            await this.createNews(param)
        }
    }
    findAll = async (param) => {
        return this.model.findAll({ ...param });
    }
    findById = async (id) => {
        return this.model.findByPk(id);
    }
}
exports.Administrative = Administrative
