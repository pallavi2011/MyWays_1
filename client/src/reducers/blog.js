import { BLOG_ERROR, GET_BLOGS, UPDATE_LIKES, GET_BLOG, ADD_COMMENT, REMOVE_COMMENT, EDIT_BLOG, DELETE_BLOG} from "../actions/types";

const initialState = {
    blog: {},
    blogs: [],
    loading: true,
    error: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_BLOG:
                return{
                    ...state,
                    blog: payload,
                    loading: false
                }
                break;
        case GET_BLOGS:
            return{
                ...state,
                blogs: payload,
                loading: false
            }
            break;
        case BLOG_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
            break;
        case UPDATE_LIKES:
            return {
                ...state,
                blogs: state.blogs.map(blog => blog._id === payload.blog_id ? {...blog, likes:payload.likes}: blog),
                loading: false
            }
            break;
        case ADD_COMMENT:
            return{
                ...state,
                blog: {
                    ...state.blog,
                    comments: payload
                },
                loading: false
            }
            break;
        case REMOVE_COMMENT:
            return{
                ...state,
                blog: {
                    ...state.blog,
                    comments: state.blog.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
            break;
        case EDIT_BLOG:
            return{
                ...state,
                blog: payload,
                loading: false
            }
            break;
        case DELETE_BLOG:
            return{
                ...state,
                blog: payload,
                loading: false
            }
        default:
            return state

    }
}