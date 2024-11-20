import { IBlog } from '../../../interfaces/IBlog';

export default function validateCreateBlogForm(blogFormState: IBlog) {
  const errors: { [key: string]: string } = {
    title: validateIsRequired(blogFormState.title) ? 'Title' : '',
    content: validateIsRequired(blogFormState.content) ? 'Content' : ''
  };

  if (!errors.title) delete errors.title;
  if (!errors.content) delete errors.content;

  return errors;
}

function validateIsRequired(value: string): boolean {
  return !value;
}
