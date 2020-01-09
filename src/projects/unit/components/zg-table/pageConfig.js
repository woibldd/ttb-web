export default class pageConfig {
  constructor (option) {
    this._defaulValue = option || {
      currentPage: 1,
      pageSizes: [10, 50, 100],
      pageSize: 10
    }
    Object.assign(this, this._defaulValue)
  }
  handleSizeChange (pageSize) {
    if (pageSize) this.pageSize = pageSize
    // this.$emit('change', this)
  }
  handleCurrentChange (currentPage) {
    if (currentPage) this.currentPage = currentPage
    // this.$emit('change', this)
  }
  init (option) {
    Object.assign(this, this._defaulValue)
  }
}
