import { v4 as uuidV4 } from 'uuid';
import randomString from "randomstring";

import User from "./models/Product";
// import ResponseError, { ErrorCode } from './error';
// import { UserData, LoginUserData } from './types';

class ProductService {

    async findProducts({ page, perPage, owners, priceAbove, priceBeyond, title, company }: any) {
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

}


export default new ProductService();