import { Timestamp } from 'firebase/firestore';
import { IBlog } from '../../../interfaces/IBlog';

export const IBlogInitialState: IBlog = {
  author: '',
  id: crypto.randomUUID(),
  content: '',
  title: '',
  overview: '',
  image: '',
  timeToRead: '',
  dateCreated: Timestamp.fromDate(new Date())
};

const CreateBlogReducerType = {
  UPDATE_AUTHOR: '611b29e5-5eac-4df9-bd18-9cb23debe08d',
  UPDATE_CONTENT: '6ebdef19-c5a0-47d1-9e96-0afe7cb03185',
  UPDATE_TITLE: 'da40596f-0622-48f2-a2b3-13687802224f',
  UPDATE_OVERVIEW: 'bce6a5a2-3cba-460e-8a07-aca516f89871',
  UPDATE_IMAGE: '039a75c2-92fd-4a0f-ad2c-b4c25cf0b3fa',
  OVERRIDE_BLOG: '40132fe1-91f0-4797-9ae6-ed5a481762d9'
};
type CreateBlogReducerTypes =
  (typeof CreateBlogReducerType)[keyof typeof CreateBlogReducerType];

interface CreateBlogReducerAction {
  type: CreateBlogReducerTypes;
  payload: string;
}

export function createBlogReducer(
  state: IBlog,
  action: CreateBlogReducerAction
): IBlog {
  switch (action.type) {
    case CreateBlogReducerType.UPDATE_AUTHOR:
      return { ...state, author: action.payload };
    case CreateBlogReducerType.UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case CreateBlogReducerType.UPDATE_TITLE:
      return { ...state, title: action.payload };
    case CreateBlogReducerType.UPDATE_OVERVIEW:
      return { ...state, overview: action.payload };
    case CreateBlogReducerType.UPDATE_IMAGE:
      return { ...state, image: action.payload };
    case CreateBlogReducerType.OVERRIDE_BLOG: {
      const blog: IBlog = JSON.parse(action.payload);
      return { ...blog };
    }
    default:
      throw new Error('Unknown reducer type');
  }
}

export function updateAuthor(name: string): CreateBlogReducerAction {
  return { type: CreateBlogReducerType.UPDATE_AUTHOR, payload: name };
}

export function updateContent(content: string): CreateBlogReducerAction {
  return { type: CreateBlogReducerType.UPDATE_CONTENT, payload: content };
}

export function updateTitle(title: string): CreateBlogReducerAction {
  return { type: CreateBlogReducerType.UPDATE_TITLE, payload: title };
}

export function updateOverview(overview: string): CreateBlogReducerAction {
  return { type: CreateBlogReducerType.UPDATE_OVERVIEW, payload: overview };
}

export function updateImage(image: string): CreateBlogReducerAction {
  return { type: CreateBlogReducerType.UPDATE_IMAGE, payload: image };
}

export function overrideBlog(blog: IBlog): CreateBlogReducerAction {
  return {
    type: CreateBlogReducerType.OVERRIDE_BLOG,
    payload: JSON.stringify(blog)
  };
}
