const logMiddleware = (req, res, next) => {
  const timeStart = Date.now()
  console.log("Halo Saya Log Middleware")

  res.on('finish', () => {
    const timeEnd = Date.now()

    console.log({
      timeStart,
      timeEnd,
      duration: `${timeEnd - timeStart} ms`,
    })
  })

  next()
}

export default logMiddleware