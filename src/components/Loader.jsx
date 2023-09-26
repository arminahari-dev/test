import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Loader() {
  return (
    <div className="loader">
      <p>Loding Data &nbsp; {<FontAwesomeIcon icon={faSpinner} spinPulse />}</p>
    </div>
  );
}

export default Loader;
