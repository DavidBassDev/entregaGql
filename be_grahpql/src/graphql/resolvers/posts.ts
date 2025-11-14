import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';


const PostResolver: IResolvers = {
    Query: {
       async getPosts() {
            try {
                const response = await axios.get('https://691747e6a7a34288a28034f3.mockapi.io/post');
                return response.data;
              } catch (error) {
                console.error('Error fetching Posts:', error);
                return [];
              }
        }
    }
}

export default PostResolver;