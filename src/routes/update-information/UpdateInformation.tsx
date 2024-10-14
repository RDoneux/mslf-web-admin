import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import IAuthor from './interfaces/IAuthor';
import { Button } from '@material-tailwind/react';
import MslfInput from '../../components/MslfInput';
import toast from 'react-hot-toast';
import BackButton from '../../components/back-button/BackButton';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import styles from './UpdateInformation.module.css';

export default function UpdateInformation() {
  const DEFAULT_AUTHOR_STATE: IAuthor = { name: '', tag: '' };
  const [authorDetails, setAuthorDetails] =
    useState<IAuthor>(DEFAULT_AUTHOR_STATE);
  const [aboutText, setAboutText] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const authorDetailsReference = doc(db, 'author', 'details');
    getDoc(authorDetailsReference).then((documentSnapshot) => {
      const details: IAuthor = {
        ...documentSnapshot.data()
      } as IAuthor;
      setAuthorDetails(details);
    });

    const authorInspirationReference = doc(db, 'author', 'about');
    getDoc(authorInspirationReference).then((documentSnapshot) => {
      const about: { inspiration: string } = {
        ...documentSnapshot.data()
      } as { inspiration: string };
      setAboutText(about.inspiration);
    });
  }, []);

  async function onSubmit() {
    const authorDetailsReference = doc(db, 'author', 'details');
    const authorInspirationReference = doc(db, 'author', 'about');
    toast.promise(
      Promise.all([
        updateDoc(authorDetailsReference, { ...authorDetails }),
        updateDoc(authorInspirationReference, {
          ...{ inspiration: aboutText ?? '' }
        })
      ]),
      {
        success: 'Homepage information updated',
        loading: 'Updating homepage information...',
        error: 'There was a problem updating homepage information'
      }
    );
    navigate('/');
  }

  function updateName(name: string): IAuthor {
    if (!authorDetails) return DEFAULT_AUTHOR_STATE;
    return { ...authorDetails, name };
  }

  function updateTag(tag: string): IAuthor {
    if (!authorDetails) return DEFAULT_AUTHOR_STATE;
    return { ...authorDetails, tag };
  }

  return (
    <form className={`${styles['form']} grid grid-cols-1 h-full gap-4 w-2/3 mt-24`}>
      <BackButton />
      <h1 className="text-4xl">Home Page Information</h1>
      <MslfInput
        label="Name"
        value={authorDetails?.name}
        onChange={(newValue: string) => setAuthorDetails(updateName(newValue))}
      />
      <MslfInput
        label="Tag"
        value={authorDetails?.tag}
        onChange={(newValue: string) => setAuthorDetails(updateTag(newValue))}
      />

      <ReactQuill
        theme="snow"
        value={aboutText ?? ''}
        onChange={(e) => setAboutText(e)}
      />

      <Button
        className="rounded h-[35px] bg-[#ef790d] hover:bg-[#ef790daa]"
        onClick={onSubmit}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <p className="text-md">Submit</p>
      </Button>
    </form>
  );
}
