import toast from 'react-hot-toast';

interface ReloadPoemsProps {
  reloadPoems: () => void;
}

export default function ReloadPoems({ reloadPoems }: ReloadPoemsProps) {
  function handleReloadPoems() {
    reloadPoems();
    toast.success('Poems Reloaded');
  }

  return (
    <span
      onClick={handleReloadPoems}
      className="material-symbols-outlined top-5 right-5 cursor-pointer transition-transform text-[#353535] hover:text-[#ef790d] hover:rotate-45"
    >
      refresh
    </span>
  );
}
