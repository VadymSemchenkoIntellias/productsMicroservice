import Product from "./models/Product";
import ResponseError, { ErrorCode } from './error';
import axios from 'axios';

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
        page: number, limit: number, owners: string[], priceAbove: number, priceBelow: number, title: string, company: number, accessToken: string
    }
    ) {
        const { page, limit, owners, priceAbove, priceBelow, title, company, accessToken } = args;

        // if ([!page, !limit, !owners, !priceAbove, !priceBelow, !title, !company].some(reason => reason)) {
        //     console.log('BAD REQUEST')
        //     throw new ResponseError(ErrorCode.BAD_REQUEST, 'Bad request');
        // }
        const filters: any[] = [];
        if (owners) {
            filters.push({
                owner: { $regex: owners.join('|'), $options: 'i' }
            })
        };
        if (priceAbove) {
            filters.push(
                {
                    price: {
                        $gte: priceAbove,
                        // $lte: priceBelow
                    }
                },
            )
        };
        if (priceBelow) {
            filters.push(
                {
                    price: {
                        $lte: priceBelow
                    }
                },
            );
        };
        if (title) {
            filters.push({
                title: {
                    $eq: title,
                }
            });
        };
        if (company) {
            filters.push({
                company: {
                    $eq: company
                }
            });
        }

        const filter = {
            $and: filters,
        };
        const products = await Product.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const productsOwnersIds = Array.from(new Set(products.map(({ owner: ownerId }) => ownerId)));


        const ownerInfoDictionary: Record<string, { id: string, email: string }> = {};


        // await Promise.all(productsOwnersIds.map(async ownerId => {
        //     const { data: ownerInfo } = await axios.get(`http://localhost:5001/user/getUserDataById/${ownerId}`, {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     });
        //     ownerInfoDictionary[ownerId] = ownerInfo as unknown as { id: string, email: string };
        // }));

        const count = await Product.count(filter);

        const productsWithOwnerInfo = products.map((item, index) => {
            return ({
                ...item.toObject(),
                // owner: {
                //     id: ownerInfoDictionary[item.owner].id,
                //     email: ownerInfoDictionary[item.owner].email
                // }
            })
        });
        return {
            products: productsWithOwnerInfo,
            count
        }
    }

}


export default new ProductService();