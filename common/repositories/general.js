class Administrative {
  constructor(model) {
    this.model = model
  }
  create = async (where, data) => {
    if (typeof data !== 'object')
      return null;

    if (where === null)
      return await this.model.create({ ...data })

    return await this.model.findOrCreate({ where: where, defaults: data })
  }
  createMultiple = async (params) => {
    if (!Array.isArray(params))
      return null;

    for await (const { where, data } of params) {
      await this.create(where, data)
    }
  }
}
exports.Administrative = Administrative
