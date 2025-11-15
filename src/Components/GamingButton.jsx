
import './GamingButton.css';

const GamingButton = ({ text, onClick }) => {
  return (
    <button className="gaming-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default GamingButton;
