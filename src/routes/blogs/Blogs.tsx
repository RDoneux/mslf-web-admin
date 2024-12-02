import { useEffect, useState } from 'react';
import { IBlog } from '../../interfaces/IBlog';
import { db } from '../../firebase';
import {
  collection,
  where,
  query,
  getDocs,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import BackButton from '../../components/back-button/BackButton';
import ReloadPoems from '../poems/fragments/ReloadPoems';
import CreateBlogLink from './fragments/CreateBlogLink';
import EditBlogLink from './fragments/EditBlogLink';

export default function Blogs() {
  const [blogs, setBlogs] = useState<IBlog[]>();

  useEffect(() => {
    reloadBlogs();
  }, []);

  function reloadBlogs(): void {
    const collectionReference = collection(db, 'blogs');
    const q = query(collectionReference, where('__name__', '!=', 'count'));

    getDocs(q).then((snapshot: QuerySnapshot) => {
      setBlogs(
        snapshot.docs.map(
          (value: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
            value.data()
        ) as IBlog[]
      );
    });
  }

  return (
    <>
      <BackButton />
      <div className="w-5/6 grid gap-10 mt-10 md:w-2/3">
        <h1 className="text-5xl text-center">Create / Edit Blogs</h1>
        <CreateBlogLink />
        <span className="relative flex gap-5 items-center pr-5">
          <hr className="border-[#353535] w-full" />
          <ReloadPoems reloadPoems={reloadBlogs} />
        </span>
        <ul className="grid gap-5 h-full overflow-y-auto overflow-x-hidden">
          {blogs?.map((blog: IBlog) => (
            <EditBlogLink key={blog.id} blog={blog} reloadBlogs={reloadBlogs} />
          ))}
        </ul>
      </div>
    </>
  );
}
