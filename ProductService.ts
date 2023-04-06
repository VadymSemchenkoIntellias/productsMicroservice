import { v4 as uuidV4 } from 'uuid';
import randomString from "randomstring";

import Product from "./models/Product";
// import ResponseError, { ErrorCode } from './error';
// import { UserData, LoginUserData } from './types';

const DUMMY_DATA = [
    {
        id: '642f112cef51cde1eef43fb0',
        company: 'Intellias',
        title: 'Honey',
        price: 200,
        count: 3,
        currency: 'UAH'
    },
    {
        id: '642f11cfef51cde1eef43fb7',
        company: 'Guesty',
        title: 'Milk',
        price: 100,
        count: 5,
        currency: 'USD'
    },
    {
        id: '642f11e5ef51cde1eef43fbe',
        company: 'Svitoch',
        title: 'Fish',
        price: 400,
        count: 7,
        currency: 'USD'
    },
    {
        id: '642f172fef51cde1eef43fc6',
        company: 'Pravda',
        title: 'Eggs',
        price: 40,
        count: 8,
        currency: 'UAH'
    },
    {
        id: '642f1976ef51cde1eef43fd1',
        company: 'Intellias',
        title: 'Bread',
        price: 300,
        count: 8,
        currency: 'USD'
    },
    {
        id: '642f1985ef51cde1eef43fd8',
        company: 'Pravda',
        title: 'Cheese',
        price: 500,
        count: 4,
        currency: 'USD'
    },
    {
        id: '642f19b1ef51cde1eef43fe8',
        company: 'Svitoch',
        title: 'Butter',
        price: 600,
        count: 3,
        currency: 'UAH'
    },
    {
        id: '642f1996ef51cde1eef43fe0',
        company: 'Guesty',
        title: 'Nutella',
        price: 400,
        count: 9,
        currency: 'USD'
    }
]


class ProductService {

    async findProducts({ page, limit, owners, priceAbove, priceBelow, title, company }: any) {
        console.log('OWNERS', owners);



        try {
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
                    }
                ],
            };
            const products = await Product.find(filter)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();

            const count = await Product.count();
            console.log('PRODUCTS', products);
            console.log('RESPONSE', products.length);
            console.log('TOTAL', count);
        } catch (error) {

        }
        // const invalidCredentailReasons = [!email, !password, !name, !company, !validateEmail(email), !validatePassword(password)];
        // const invalidCredentailReasonIndex = invalidCredentailReasons.findIndex(reason => reason);
        // if (invalidCredentailReasonIndex !== -1) {
        //     throw new ResponseError(ErrorCode.INVALID_CREDENTIALS, 'Invalid credentials');
        // }
        // const existingUser = await User.findOne({ email }).lean();
        // if (existingUser) {
        //     throw new ResponseError(ErrorCode.EMAIL_ALREADY_REGISTERED, 'Email already registered');
        // }
        // const passwordHash = await bcrypt.hash(password, 5);
        // const userData = await User.create({ email, passwordHash, name, company });
        // const { accessToken, accessTokenExpirationTime, refreshToken, refreshTokenExpirationTime } = await this._createAccessToken(userData.id);
        // return { email: userData.email, id: userData.id, accessToken, accessTokenExpirationTime, refreshToken, refreshTokenExpirationTime, name, company };
    }

    // async _createDummyProducts() {
    //     try {
    //         await Promise.all(DUMMY_DATA.map(({ id: owner, ...rest }) => Product.create({
    //             owner,
    //             ...rest
    //         })))
    //     } catch (error) {
    //         console.log('ERROR AT CREATING PRODUCTS', error);
    //     }
    // }

}


export default new ProductService();