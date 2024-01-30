const logout = (req, res) => {
    res.cookie('jwt', 1, { maxAge: 1 }).redirect('/')
}
module.exports = logout