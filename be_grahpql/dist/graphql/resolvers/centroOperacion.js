import { CopsDataSource } from '../../data/copsdata';
const centroOperacionResolver = {
    Query: {
        getCos() {
            return CopsDataSource;
        }
    }
};
export default centroOperacionResolver;
