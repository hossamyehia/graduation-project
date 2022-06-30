module.exports = (res, code, err) => {
    res.status(code).setHeader('Content-Type', 'application/json').json({err: err});
}