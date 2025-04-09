import '../assets/css/ChatIa.css'
import { Plus, ArrowUp } from 'lucide-react';
export default function ChatIa() {
  return (
    <div className="chatBox-Container">
      <h3>Besoin d&apos;aide ?</h3>
      <form>
      <textarea className="Chat-input" type="text" placeholder="poser une question" />
      <div className="form-btn">
        <button className="plus-btn">
          <Plus size={25} />
        </button>
        <button className="valider-btn">
          <ArrowUp size={25} />
        </button>
      </div>
    </form>
    </div>
  );
}
