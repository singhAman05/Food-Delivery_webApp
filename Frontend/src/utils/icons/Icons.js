import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLessThan,
  faGreaterThan,
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

export const Remove = RemoveIcon;
export const Add = AddIcon;
export const Delete = DeleteSweepIcon;
export const AddToCart = AddShoppingCartIcon;
export const LinkedIn = LinkedInIcon;
export const Twitter = XIcon;
export const Youtube = YouTubeIcon;
export const Instagram = InstagramIcon;
export const Github = GitHubIcon;
export const Close = CloseIcon;
export const Mic = KeyboardVoiceIcon;
export const Listen = GraphicEqIcon;

export const Previous = <FontAwesomeIcon icon={faLessThan} />;
export const Next = <FontAwesomeIcon icon={faGreaterThan} />;
export const Lock = <FontAwesomeIcon icon={faLock} />;
export const Envelope = <FontAwesomeIcon icon={faEnvelope} />;
export const User = <FontAwesomeIcon icon={faUser} />;
export const Phone = <FontAwesomeIcon icon={faPhone} />;
export const CartPlus = <FontAwesomeIcon icon={faCartPlus} />;
