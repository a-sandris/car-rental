const { RESTDataSource } = require('apollo-datasource-rest')

const PATH = '/carlist.json'

class CarsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://sampledata.bookinggroup.com';
    }

    async getCars() {
        const response = await this.get(PATH, null, {
            cacheOptions: { ttl: 60 }
        })
        return response.cars.map(it => ({
            id: it.car.id,
            name: it.car.name,
            imageUrl: it.car.imageUrl,
            seats: it.car.seats ? parseInt(it.car.seats) : 0,
            doors: it.car.doors,
            airConditioningPresent: it.car.airco,
            categories: it.car.carTypeForWeb ? it.car.carTypeForWeb : [],
            transmission: it.car.transmission === 1 ? 'Manual' : 'Automatic',
            bagagge: {
                small: it.car.smallSuitcases ? parseInt(it.car.smallSuitcases) : 0,
                big: it.car.bigSuitcases ? parseInt(it.car.bigSuitcases) : 0
            },
            price: {
                total: it.price.total,
                currency: it.price.currency
            },
            supplier: {
                id: it.supplier.id,
                name: it.supplier.name.trim(),
                rating: it.supplier.rating
            }
        }))
    }

    async getSuppliers() {
        const response = await this.get(PATH, null, {
            cacheOptions: { ttl: 60 }
        })
        return response.cars.map(car => car.supplier)
            .map(({ id, name, rating }) => ({ id, name, rating }))
            .reduce((acc, value) => {
                if (acc.find(it => it.id === value.id)) {
                    return acc
                }
                acc.push(value)
                return acc
            }, [])
    }
};

module.exports = {
    CarsAPI
}