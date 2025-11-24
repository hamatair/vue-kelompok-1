import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faPenToSquare,
  faCalendar,
  faStar as faStarRegular
} from "@fortawesome/free-regular-svg-icons";

import {
  faStar as faStarSolid
} from "@fortawesome/free-solid-svg-icons";

library.add(faPenToSquare, faCalendar, faStarRegular, faStarSolid);

export default FontAwesomeIcon;
