import { useEffect, useState } from 'react';
import CreatePoemLink from './fragments/CreatePoemLink';
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '../../firebase';
import { IPoem } from '../../interfaces/IPoem';
import EditPoemLink from './fragments/EditPoemLink';

export default function Poems() {
  const [poems, setPoems] = useState<IPoem[]>();

  useEffect(() => {
    const documentReference = collection(db, 'poems');
    getDocs(documentReference).then((snapshot: QuerySnapshot) => {
      setPoems(
        snapshot.docs.map(
          (value: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
            value.data()
        ) as IPoem[]
      );
    });

  }, []); // eslint-disable-line

  return (
    <>
      <ul className="w-2/3 grid gap-10 mt-10">
        <h1 className="text-5xl text-center">Create / Edit Poems</h1>
        <CreatePoemLink />
        <hr className="border-[#353535]"/>
        {poems?.map((poem: IPoem) => <EditPoemLink poem={poem} />)}
      </ul>
    </>
  );
}
