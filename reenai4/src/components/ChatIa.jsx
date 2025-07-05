import { Plus, ArrowUp } from 'lucide-react';
export default function ChatIa() {
  return (
    <div className="chatBox-Container flex flex-col max-w-[600px] w-full rounded-[20px]">
      <h3 className='text-center text-3xl mb-4'>Besoin d&apos;aide ?</h3>
      <form className='flex flex-col bg-black rounded-[20px] max-h-200px'>
      <textarea className="Chat-input rounded-[20px] p-4 border-0 text-white bg-black outline-0 h-full w-full resize-none" type="text" placeholder="poser une question" />
      <div className="form-btn m-0 flex justify-between items-center p-2">
        <button className="plus-btn flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#8EB897] text-white rounded-full p-3 cursor-pointer m-0">
          <Plus size={25} />
        </button>
        <button className="valider-btn justify-center items-center transition duration-300 ease-in-out hover:bg-[#8EB897] text-white rounded-full p-3 cursor-pointer m-0">
          <ArrowUp size={25} />
        </button>
      </div>
    </form>
    </div>
  );
}
