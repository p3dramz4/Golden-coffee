import {
  FaEnvelopeOpenText,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./information.module.css";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";

const Information = () => {
  return (
    <section className={styles.Information}>
      <span>تماس با ما</span>
      <p className="text-black dark:text-white">اطلاعات تماس</p>
      <div>
        <PiCoffeeFill />
        <p>شرکت فنجان داغ خوارزمی (کارخانه قهوه ست )</p>
      </div>
      <div>
        <FaInternetExplorer />
        <p>GoldenCoffee.com</p>
      </div>
      <div>
        <BiSolidContact />
        <p>
          {" "}
          تهران، اشرفی اصفهانی، روبروی پاساژ تیراژه، خیابان نیک زارع، کوچه12
          متری چهارم، پلاک 12
        </p>
      </div>
      <div>
        <FaPhone />
        <p>021-33814721</p>
      </div>
      <div>
        <FaEnvelopeOpenText />
        <p>offee[at]golden-coffee.com</p>
      </div>
      <div>
        <FaEnvelopeOpenText />
        <p>whole[at]golden-coffee.com</p>
      </div>
      <div>
        <FaTelegramPlane />
        <p>تماس با مدیریت از طریق واتساپ و یا تلگرام : 09106163341</p>
      </div>
    </section>
  );
};

export default Information;
