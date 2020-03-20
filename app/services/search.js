exports.get_store = async (req, res) => {
    try {
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
};