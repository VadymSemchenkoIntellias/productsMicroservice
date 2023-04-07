import Product from "./models/Product";
import ResponseError, { ErrorCode } from './error';

// const DUMMY_DATA = [
//     {
//         id: '642f112cef51cde1eef43fb0',
//         company: 'Intellias',
//         title: 'Honey',
//         price: 200,
//         count: 3,
//         currency: 'UAH'
//     },
//     {
//         id: '642f11cfef51cde1eef43fb7',
//         company: 'Guesty',
//         title: 'Milk',
//         price: 100,
//         count: 5,
//         currency: 'USD'
//     },
//     {
//         id: '642f11e5ef51cde1eef43fbe',
//         company: 'Svitoch',
//         title: 'Fish',
//         price: 400,
//         count: 7,
//         currency: 'USD'
//     },
//     {
//         id: '642f172fef51cde1eef43fc6',
//         company: 'Pravda',
//         title: 'Eggs',
//         price: 40,
//         count: 8,
//         currency: 'UAH'
//     },
//     {
//         id: '642f1976ef51cde1eef43fd1',
//         company: 'Intellias',
//         title: 'Bread',
//         price: 300,
//         count: 8,
//         currency: 'USD'
//     },
//     {
//         id: '642f1985ef51cde1eef43fd8',
//         company: 'Pravda',
//         title: 'Cheese',
//         price: 500,
//         count: 4,
//         currency: 'USD'
//     },
//     {
//         id: '642f19b1ef51cde1eef43fe8',
//         company: 'Svitoch',
//         title: 'Butter',
//         price: 600,
//         count: 3,
//         currency: 'UAH'
//     },
//     {
//         id: '642f1996ef51cde1eef43fe0',
//         company: 'Guesty',
//         title: 'Nutella',
//         price: 400,
//         count: 9,
//         currency: 'USD'
//     }
// ]


class ProductService {

    async findProducts(args: {
        page: number, limit: number, owners: string[], priceAbove: number, priceBelow: number, title: string, company: number
    }
    ) {
        const { page, limit, owners, priceAbove, priceBelow, title, company } = args;
        if ([!page, !limit, !owners, !priceAbove, !priceBelow, !title, !company].some(reason => reason)) {
            throw new ResponseError(ErrorCode.BAD_REQUEST, 'Bad request');
        }
        const filter = {
            $and: [
                {
                    owner: { $regex: owners.join('|'), $options: 'i' }
                },
                {
                    price: {
                        $gte: priceAbove,
                        $lte: priceBelow
                    }
                },
                {
                    title: {
                        $eq: title,
                    }
                },
                {
                    company: {
                        $eq: company
                    }
                }
            ],
        };
        const products = await Product.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.count(filter);
        return {
            products,
            count
        }
    }

}


export default new ProductService();