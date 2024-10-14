import { useEffect, useReducer, useState } from 'react';
import MslfInput from '../../components/MslfInput';
import {
  createPoemReducer,
  IPoemInitialState,
  overridePoem,
  updateContent,
  updateImage,
  updateTitle
} from './reducers/CreatePoemReducer';
import ReactQuill from 'react-quill';
import { Button } from '@material-tailwind/react';
import { IPoem } from '../../interfaces/IPoem';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { calculateReadingTime } from '../../helpers/PoemUtils';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import validateForm from './hooks/useValidateCreatePoemForm';
import styles from './CreatePoem.module.css';
import BackButton from '../../components/back-button/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreatePoem() {
  const [state, dispatch] = useReducer(createPoemReducer, IPoemInitialState);
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

    const documentReference = doc(db, 'poems', id ?? '');
    getDoc(documentReference).then((documentSnapshot) => {
      const poem: IPoem = {
        ...documentSnapshot.data()
      } as IPoem;

      dispatch(overridePoem(poem));
    });
  }, [id]);

  async function onSubmit() {
    errors = validateForm(state);
    setSubmitted(true);

    if (Object.values(errors ?? {}).length) {
      toast.error(
        `The following inputs are required: ${Object.values(errors).join(', ')}`
      );
      return;
    }

    const submitObject: IPoem = { ...state };
    submitObject.author = 'James Smith';
    submitObject.dateCreated = Timestamp.fromDate(new Date());
    submitObject.timeToRead = `${calculateReadingTime(submitObject.content)} read`;

    const documentReference = doc(db, 'poems', submitObject.id);
    toast.promise(setDoc(documentReference, submitObject), {
      success: `'${submitObject.title}' successfully uploaded`,
      loading: `Creating '${submitObject.title}'`,
      error: `There was an error creating '${submitObject.title}'`
    });

    navigate('/poems');
  }

  return (
    <form
      className={`${styles['form']} grid grid-cols-1 gap-4 h-full w-full p-5 mt-10 md:w-2/3`}
    >
      <BackButton />
      <h1 className="text-5xl">{id ? 'Edit Poem' : 'Create Poem'}</h1>
      <MslfInput
        value={state.title}
        label="Title"
        error={submitted && !errors?.name}
        onChange={(e) => dispatch(updateTitle(e))}
      />

      <MslfInput
        value={state.image}
        label="Background Image"
        error={submitted && !errors?.image}
        onChange={(e) => dispatch(updateImage(e))}
      />

      <ReactQuill
        value={state.content}
        onChange={(e) => dispatch(updateContent(e))}
        modules={modules}
      />
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
