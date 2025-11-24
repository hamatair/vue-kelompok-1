import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Regular icons
import {
  faStar as faStarRegular
} from "@fortawesome/free-regular-svg-icons";

// Solid icons (tambahan sesuai desain)
import {
  faPenToSquare,
  faTrash,
  faCalendar,
  faStar as faStarSolid
} from "@fortawesome/free-solid-svg-icons";

// Tambahkan ke library
library.add(
  faPenToSquare,
  faTrash,
  faCalendar,
  faStarRegular,
  faStarSolid
);

export default FontAwesomeIcon;
