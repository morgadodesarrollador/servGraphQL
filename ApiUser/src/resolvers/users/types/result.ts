import { IResolvers } from '@graphql-tools/utils';
import { ELEMENTS_SELECT } from '../../../config/constants';

const resolverTypes: IResolvers = {
    Result: {   // resolver la interface de graphql
        __resolveType( root: { elementSelect: string }){
            if (root.elementSelect === ELEMENTS_SELECT.USER){
                return 'ResultUser'
            }
            if (root.elementSelect === ELEMENTS_SELECT.TOKEN){
                return 'ResultToken'
            }
           // return null; // GraphQLError is thrown
        }
    }
}

export default resolverTypes;