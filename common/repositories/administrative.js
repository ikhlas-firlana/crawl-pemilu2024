class Administrative {
    constructor({model, modelVote}) {
        this.model = model
        this.modelVote = modelVote
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
    createVote = async (params) => {
        if (typeof params !== 'object')
            return null;

        const data = {
            parent: params['parent'] ? params['parent'] : 0,
            info: params['info'] ? params['info'] : null,
            level: params['level'] ? params['level'] : null,
            total_dpt: params['total_dpt'] ? params['total_dpt'] : null,
            total_dptb: params['total_dptb'] ? params['total_dptb'] : null,
            total_dpk: params['total_dpk'] ? params['total_dpk'] : null,
            total_dpt_dptb_dpk: params['total_dpt_dptb_dpk'] ? params['total_dpt_dptb_dpk'] : null,
            total_valid: params['total_valid'] ? params['total_valid'] : null,
            total_invalid: params['total_invalid'] ? params['total_invalid'] : null,
            total_valid_invalid: params['total_valid_invalid'] ? params['total_valid_invalid'] : null,
            candidate_1: params['candidate_1'] ? params['candidate_1'] : null,
            candidate_2: params['candidate_2'] ? params['candidate_2'] : null,
            candidate_3: params['candidate_3'] ? params['candidate_3'] : null,

        }
        const where = { parent: params['parent'] }

        const objectData = await this.modelVote.findOne({
            where,
        });

        if (objectData && objectData?.dataValues?.info !== params['info']) {
            const {id} = objectData?.dataValues

            await Promise.all([
                this.modelVote.create({...data}),
                this.modelVote.destroy({
                    where: {
                        id,
                    }
                }),
            ]);
        } else if (!objectData) {
            await this.modelVote.create({...data})
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
    findAllVoter = async (param) => {
        return this.modelVote.findAll({ ...param });
    }
    findById = async (id) => {
        return this.model.findByPk(id);
    }
}
exports.Administrative = Administrative
