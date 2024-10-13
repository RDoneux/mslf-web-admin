import { useEffect, useState } from 'react';
import CreatePoemLink from './fragments/CreatePoemLink';
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
  query,
  where
} from 'firebase/firestore';
import { db } from '../../firebase';
import { IPoem } from '../../interfaces/IPoem';
import EditPoemLink from './fragments/EditPoemLink';
import BackButton from '../../components/back-button/BackButton';

export default function Poems() {
  const [poems, setPoems] = useState<IPoem[]>();

  useEffect(() => {
    const collectionReference = collection(db, 'poems');
    const q = query(collectionReference, where('__name__', '!=', 'count'));

    getDocs(q).then((snapshot: QuerySnapshot) => {
      setPoems(
        snapshot.docs.map(
          (value: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
            value.data()
        ) as IPoem[]
      );
    });
  }, []);

  return (
    <>
      <BackButton />
      <ul className="w-2/3 grid gap-10 mt-10">
        <h1 className="text-5xl text-center">Create / Edit Poems</h1>
        <CreatePoemLink />
        <hr className="border-[#353535]" />
        {poems?.map((poem: IPoem) => <EditPoemLink poem={poem} />)}
      </ul>
    </>
  );
}
