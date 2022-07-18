const fs = require(`fs`)
const path = require(`path`)
const {
    v4: uuidv4
} = require('uuid');

class Categories {
    constructor(name, year, price, img) {
        this.name = name
        this.year = year
        this.price = +price
        this.img = img

    }
    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, `..`, `data`, `categories.json`),
                (err, data) => {
                    if (err) rej(err);
                    res(JSON.parse(data))
                }
            )
        })
    }
    toJSON() {
        return {
            name: this.name,
            year: this.year,
            price: this.price,
            img: this.img,
            id: uuidv4()
        }

    }
    async save() {
        const categories = await Categories.getAll()
        const categoriy = this.toJSON()
        categories.push(categoriy)
        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, `..`, `data`, `categories.json`), JSON.stringify(categories), (err) => {
                if (err) rej(err)
                res();
            })
        })
    }
    static async findById(id) {
        const categories = await Categories.getAll()
        return new Promise((res, rej) => {
            const categoriy = categories.find(cat => cat.id === id)
            if (!categoriy) {
                console.log(`Id is not found`);
            }
            res(categoriy)
        })

    }
   

    static async findByIdAndUpdate(id, categoriy) {
        const categories = await Categories.getAll()
        const idx = categories.findIndex(cat => cat.id === id)
        if (idx < 0) {
            return console.log(`Id is not found`);
        }
        categories[idx] = categoriy
        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, `..`, `data`, `categories.json`), JSON.stringify(categories), (err) => {
                if (err) rej(err)
                res();
            })
        })

    }
    static async removeByid(id) {
        const categories = await Categories.getAll()
        return new Promise((res, rej) => {
            const idx = categories.findIndex(cat => cat.id === id)
            if (idx < 0) {
                console.log(`Id is not found`);
                return
            }
            categories.splice(idx, 1)
            fs.writeFile(path.join(__dirname, `..`, `data`, `categories.json`), JSON.stringify(categories), (err) => {
                if (err) rej(err)
                res();
            })
        })

    }
}

module.exports = Categories