const addProducts = async (req, res) => {
    res.send("product added by admin")
}

const getproducts = async (req, res) => {
    res.send("here is all products")
}

module.exports = { addProducts, getproducts }