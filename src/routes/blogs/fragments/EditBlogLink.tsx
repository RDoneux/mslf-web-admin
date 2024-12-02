import { NavLink } from 'react-router-dom';
import EditIcon from '../../poems/fragments/EditIcon';
import { IBlog } from '../../../interfaces/IBlog';
import styles from '../../poems/fragments/EditPoemLink.module.css';
import DeleteBlogButton from './DeletePoemButton';

interface EditBlogLinkProps {
  blog: IBlog;
  reloadBlogs: () => void;
}

export default function EditBlogLink({ blog, reloadBlogs }: EditBlogLinkProps) {
  return (
    <li className={`${styles['list-item']} p-0 rounded md:p-5`}>
      <NavLink to={`/create-blog/${blog.id}`} className="gap-5">
        <div className={styles['icon-wrapper']}>
          <EditIcon />
        </div>
        <p className="sm:text-3xl text-start">{blog.title}</p>
        <p className="text-base hidden lg:block">
          {blog.dateCreated?.toDate().toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </NavLink>
      <DeleteBlogButton
        blogId={blog.id}
        blogTitle={blog.title}
        reloadBlogs={reloadBlogs}
      />
    </li>
  );
}
