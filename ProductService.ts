import Product from "./models/Product";
import ProductSummary from "./models/ProductSummary";
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

    // async _migrateProducts() {
    //     try {
    //         const allProducts = await Product.find();
    //         // console.log('ALL PRODCUTS', allProducts);
    //         const productsOwnersIds = Array.from(new Set(allProducts.map(({ owner: ownerId }) => ownerId)));


    //         const ownerInfoDictionary: Record<string, { id: string, email: string }> = {};

    //         // TODO: make user resource

    //         await Promise.all(productsOwnersIds.map(async ownerId => {
    //             const { data: ownerInfo } = await axios.get(`http://localhost:5001/user/getUserDataById/${ownerId}`, {
    //                 withCredentials: true,
    //                 auth: {
    //                     username: 'products-mircoservice',
    //                     password: '123456'
    //                 }
    //             });
    //             ownerInfoDictionary[ownerId] = ownerInfo as unknown as { id: string, email: string, name: string };
    //         }));
    //         const productSummary = allProducts.map((product, index) => {
    //             if (index === 0) {
    //                 console.log('PRODUCT ITEM', product);
    //             }
    //             return ({ ...(product.toJSON()), owner: ownerInfoDictionary[product.owner] })
    //         });
    //         console.log('PRODUCT SUMMARY', productSummary[0]);
    //         await ProductSummary.create(productSummary);
    //     } catch (error) {
    //         console.log('ERROR AT MIGRATING PRODUCTS', error);
    //     }

    // }

    async findProducts(args: {
        page: number, limit: number, owners: string[], priceAbove: number, priceBelow: number, title: string, company: number
    }
    ) {
        const { page, limit, owners, priceAbove, priceBelow, title, company } = args;

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


        const ownerInfoDictionary: Record<string, { id: string, email: string, name: string }> = {};

        // TODO: make user resource

        await Promise.all(productsOwnersIds.map(async ownerId => {
            const { data: ownerInfo } = await axios.get(`http://localhost:5001/user/getUserDataById/${ownerId}`, {
                withCredentials: true,
                auth: {
                    username: 'products-mircoservice',
                    password: '123456'
                }
            });
            ownerInfoDictionary[ownerId] = ownerInfo as unknown as { id: string, email: string, name: string };
        }));

        const count = await Product.count(filter);

        const productsWithOwnerInfo = products.map((item, index) => {
            return ({
                ...item.toObject(),
                owner: {
                    id: ownerInfoDictionary[item.owner].id,
                    email: ownerInfoDictionary[item.owner].email,
                    name: ownerInfoDictionary[item.owner].name
                }
            })
        });
        return {
            products: productsWithOwnerInfo,
            count
        }
    }

    async updateOwner({ id, name, email }: { id: string; name: string; email: string }) {
        console.log('ID', id);
        console.log('NAME', name);
        console.log('EMAIL', email);
        try {
            const result = await ProductSummary.updateMany({ 'owner.id': id }, { 'owner.name': name, 'owner.email': email }, { new: true });
            console.log('RESULT', result);
        } catch (error) {
            console.log('ERROR AT UPDATING', error);
        }
    }

}


export default new ProductService();