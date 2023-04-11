import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;

    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });

    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          tittle: action.payload.title,
          content: action.payload.content,
        },
      ]; //to add a new blog post, spread the old one in an array
    //and add a new blogpst object

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    code;
    const response = await jsonServer.get("/blogposts");
    console.log(response.data);
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

//function with action to modify reducer
const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { tittle: title, content: content });
    /* dispatch({
      type: "add_blogpost",
      payload: { title: title, content: content },
    }); //dispatch is an object that shows how we want to change our state variable*/

    callback();
  };
};
dir;

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id }); //instead of this we can as well refresh the page
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "edit_blogpost",
      payload: { id: id, tittle: title, content: content },
    });
    callback();
  };
};

/*export const BlogProvider = ({ children }) => {
  //const blogPosts = [{ title: "Blog Post #1" }, { title: "Blog Post #2" }];//Static list of blog posts
  const [blogPosts, dispatch] = useReducer(blogReducer, []); //the first argument is the reducer function and the second is the initial
  //state object
}
*/

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
