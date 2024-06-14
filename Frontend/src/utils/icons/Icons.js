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
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MoneyIcon from "@mui/icons-material/Money";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuIcon from "@mui/icons-material/Menu";

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
export const Up = KeyboardDoubleArrowUpIcon;
export const Down = KeyboardDoubleArrowDownIcon;
export const Rupee = CurrencyRupeeIcon;
export const Checkout = ShoppingCartCheckoutIcon;
export const Cash = MoneyIcon;
export const Card = CreditCardIcon;
export const Payments = PaymentsIcon;
export const Menu = MenuIcon;
export const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="-3 0 262 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);

export const Previous = <FontAwesomeIcon icon={faLessThan} />;
export const Next = <FontAwesomeIcon icon={faGreaterThan} />;
export const Lock = <FontAwesomeIcon icon={faLock} />;
export const Envelope = <FontAwesomeIcon icon={faEnvelope} />;
export const User = <FontAwesomeIcon icon={faUser} />;
export const Phone = <FontAwesomeIcon icon={faPhone} />;
export const CartPlus = <FontAwesomeIcon icon={faCartPlus} />;
