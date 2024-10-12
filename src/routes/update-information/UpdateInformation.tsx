import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import IAuthor from "./interfaces/IAuthor";
import { Button } from "@material-tailwind/react";
import MslfInput from "../../components/MslfInput";
import toast from "react-hot-toast";
import BackButton from "../../components/back-button/BackButton";
import { useNavigate } from "react-router-dom"

export default function UpdateInformation() {

  const DEFAULT_AUTHOR_STATE: IAuthor = { name: '', tag: '' }
  const [authorDetails, setAuthorDetails] = useState<IAuthor>(DEFAULT_AUTHOR_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const documentReference = doc(db, 'author', 'details');
    getDoc(documentReference).then((documentSnapshot) => {
      const details: IAuthor = {
        ...documentSnapshot.data()
      } as IAuthor;
      setAuthorDetails(details);
    });
  }, [])

  async function onSubmit() {
    const docRef = doc(db, "author", 'details');
    toast.promise(updateDoc(docRef, { ...authorDetails }), {
      success: "Homepage information updated",
      loading: "Updating homepage information...",
      error: "There was a problem updating homepage information"
    })
    navigate("/");
  }

  function updateName(name: string): IAuthor {
    if (!authorDetails) return DEFAULT_AUTHOR_STATE;
    return { ...authorDetails, name }
  }

  function updateTag(tag: string): IAuthor {
    if (!authorDetails) return DEFAULT_AUTHOR_STATE;
    return { ...authorDetails, tag }
  }

  return (
    <form className="grid grid-cols-1 gap-4 w-2/3 h-[300px] mt-24">
      <BackButton />
      <h1 className="text-4xl">Home Page Information</h1>
      <MslfInput label="Name" value={authorDetails?.name} onChange={(newValue: string) => setAuthorDetails(updateName(newValue))} />
      <MslfInput label="Tag" value={authorDetails?.tag} onChange={((newValue: string) => setAuthorDetails(updateTag(newValue)))} />
      <Button color="orange" onClick={onSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><p className="text-xl">Submit</p></Button>
    </form>
  );
}
