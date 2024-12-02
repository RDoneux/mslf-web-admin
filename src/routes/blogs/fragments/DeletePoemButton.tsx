import { useState } from 'react';
import styles from '../../poems/fragments/DeletePoemButton.module.css';
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

interface DeleteBlogButtonProps {
  blogId: string;
  blogTitle: string;
  reloadBlogs: () => void;
}

export default function DeleteBlogButton({
  blogId,
  blogTitle,
  reloadBlogs
}: DeleteBlogButtonProps) {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  function onDeleteBlog(): void {
    const documentReference = doc(db, 'blogs', blogId);
    toast.promise(deleteDoc(documentReference), {
      loading: `Deleting '${blogId}'`,
      success: () => {
        decrementPoemCounter();
        return `'${blogTitle}' successfully deleted`;
      },
      error: `There was an issue deleting '${blogTitle}'`
    });

    setShowConfirmationModal(false);
    reloadBlogs();
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
          <p>Delete '{blogTitle}'?</p>
        </DialogHeader>
        <DialogBody
          className={styles['body']}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Are you sure? The Blog will not be recoverable if deleted.
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
            onClick={onDeleteBlog}
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
