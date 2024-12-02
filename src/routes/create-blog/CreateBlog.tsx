import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import {
  doc,
  DocumentSnapshot,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { IBlog } from '../../interfaces/IBlog';
import {
  createBlogReducer,
  IBlogInitialState,
  overrideBlog,
  updateContent,
  updateImage,
  updateOverview,
  updateTitle
} from './reducers/CreateBlogReducer';
import toast from 'react-hot-toast';
import validateCreateBlogForm from './hooks/useValidateCreateBlogForm';
import { calculateReadingTime } from '../../helpers/PoemUtils';
import styles from './CreateBlog.module.css';
import BackButton from '../../components/back-button/BackButton';
import MslfInput from '../../components/MslfInput';
import ReactQuill from 'react-quill';
import { Button, Textarea } from '@material-tailwind/react';

export default function CreateBlog() {
  const [state, dispatch] = useReducer(createBlogReducer, IBlogInitialState);
  const [submitted, setSubmitted] = useState<boolean>();
  const navigate = useNavigate();
  let errors: { [key: string]: string } = {};

  const { id } = useParams();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' }
      ]
    ]
  };

  useEffect(() => {
    if (!id) return;

    const documentReference = doc(db, 'blogs', id ?? '');
    getDoc(documentReference).then((documentSnapshot: DocumentSnapshot) => {
      const blog: IBlog = { ...documentSnapshot.data() } as IBlog;
      dispatch(overrideBlog(blog));
    });
  }, [id]);

  async function onSubmit() {
    errors = validateCreateBlogForm(state);
    setSubmitted(true);

    if (Object.values(errors ?? {}).length) {
      toast.error(
        `The following inputs are required: ${Object.values(errors).join(', ')}`
      );
      return;
    }

    const detailsDocumentReference = doc(db, 'author/details');
    const author = await getDoc(detailsDocumentReference);
    const { name } = author.data() as { name: string };

    const submitObject: IBlog = { ...state };
    submitObject.author = name;
    submitObject.dateCreated = Timestamp.fromDate(new Date());
    submitObject.timeToRead = `${calculateReadingTime(submitObject.content)} read`;
    submitObject.id = crypto.randomUUID();

    const documentReference = doc(db, 'blogs', submitObject.id);
    toast.promise(setDoc(documentReference, submitObject), {
      success: () => {
        return `'${submitObject.title}' successfully uploaded`;
      },
      loading: `Creating '${submitObject.title}'`,
      error: `There was an error creating '${submitObject.title}'`
    });

    navigate('/blogs');
  }

  return (
    <form
      className={`${styles['form']} grid grid-cols-1 gap-4 h-full w-full p-5 mt-10 md:w-2/3`}
    >
      <BackButton />
      <h1 className="text-5xl">{id ? 'Edit Blog' : 'Create Blog'}</h1>
      <MslfInput
        value={state.title}
        label="Title"
        error={submitted && !errors?.title}
        onChange={(e) => dispatch(updateTitle(e))}
      />

      <MslfInput
        value={state.image}
        label="Image"
        error={submitted && !errors?.image}
        onChange={(e) => dispatch(updateImage(e))}
      />

      <Textarea
        label="Overview"
        color="orange"
        variant="standard"
        className="dark:text-white dark:border-gray-600 dark:before:border-gray-500 dark:after:border-blue-500"
        value={state.overview}
        labelProps={{
          className: 'dark:text-gray-400' // Label color in dark mode
        }}
        maxLength={400}
        resize={true}
        onChange={(e) => dispatch(updateOverview(e.target.value))}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />

      <label className="h-full flex flex-col">
        Content
        <ReactQuill
          value={state.content}
          onChange={(e) => dispatch(updateContent(e))}
          modules={modules}
        />
      </label>

      <Button
        className="rounded h-[35px] bg-[#ef790d] hover:bg-[#ef790daa]"
        onClick={onSubmit}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <p className="text-xl">Submit</p>
      </Button>
    </form>
  );
}
