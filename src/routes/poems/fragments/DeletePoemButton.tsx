import { useState } from 'react';
import styles from './DeletePoemButton.module.css';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import toast from 'react-hot-toast';
import { decrementPoemCounter } from '../../../helpers/PoemUtils';

interface DeletePoemButtonProps {
  poemId: string;
  poemTitle: string;
  reloadPoems: () => void;
}

export default function DeletePoemButton({
  poemId,
  poemTitle,
  reloadPoems
}: DeletePoemButtonProps) {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  function onDeletePoem(): void {
    const documentReference = doc(db, 'poems', poemId);
    toast.promise(deleteDoc(documentReference), {
      loading: `Deleting '${poemTitle}'`,
      success: () => {
        decrementPoemCounter();
        return `'${poemTitle}' successfully deleted`;
      },
      error: `There was an issue deleting '${poemTitle}'`
    });

    setShowConfirmationModal(false);
    reloadPoems();
  }

  return (
    <>
      <span
        className={`${styles['bin-button']} material-symbols-outlined`}
        onClick={() => setShowConfirmationModal(true)}
      >
        delete
      </span>

      <Dialog
        className={styles['dialog']}
        open={showConfirmationModal}
        handler={() => setShowConfirmationModal(true)}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          className={styles['header']}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p>Delete '{poemTitle}'?</p>
        </DialogHeader>
        <DialogBody
          className={styles['body']}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Are you sure? The poem will not be recoverable if deleted.
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            onClick={() => setShowConfirmationModal(false)}
            className="mr-3 rounded p-5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="rounded  bg-[#ef790d] hover:bg-[#ef790daa]"
            onClick={onDeletePoem}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
