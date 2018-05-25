
const parse = input => ({
  toBuffer: () => {
    const { document } = input
    document.render()
    return input
  }
})

export default parse