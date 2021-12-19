import { IResolvers } from '@graphql-tools/utils';
import { ELEMENTS_SELECT } from '../../config/constants';

const resolverTypes: IResolvers = {
    ResultAPI: {   // resolver la interface de graphql
        __resolveType( root: { elementSelect: string }){
            if (root.elementSelect === ELEMENTS_SELECT.USER){
                return 'ResultUser'
            }
            if (root.elementSelect === ELEMENTS_SELECT.TOKEN){
                return 'ResultToken'
            }
        }
    }
}

export default resolverTypes;